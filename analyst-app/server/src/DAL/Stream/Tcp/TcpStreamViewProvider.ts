import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { TcpStreamViewProviderQueries } from './TcpStreamViewProviderQueries';
import { TcpStreamViewProviderMappers } from './TcpStreamViewProviderMappers';
import { ITcpStreamView } from './ITcpStreamView';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';
import { getApplicationLayerProtocolByFrame } from '../../../Mappers/Stream/Frame/ApplicationLayerProtocolByFrame';
import { PacketViewHttpProvider } from '../../Packet/Http/PacketViewHttpProvider';
import { PacketViewTlsProvider } from '../../Packet/Tls/PacketViewTlsProvider';
import { ITcpStreamFilter } from './ITcpStreamFilter';
import { compareIsoDates } from '../../../Shared/Utils/compareIsoDates';
import { filter } from '../../../Shared/Utils/filter';
import { TcpStreamFilterDateOrder } from './TcpStreamFilterDateOrder';
import { PacketViewTcpProvider } from '../../Packet/Tcp/PacketViewTcpProvider';
import { FingerprintViewTcpProvider } from '../../Fingerprint/Tcp/FingerprintViewTcpProvider';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IPacketViewTcp } from '../../Packet/Tcp/IPacketViewTcp';

@Injectable()
export class TcpStreamViewProvider {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
        private readonly packetViewHttpProvider: PacketViewHttpProvider,
        private readonly packetViewTlsProvider: PacketViewTlsProvider,
        private readonly packetViewTcpProvider: PacketViewTcpProvider,
        private readonly fingerprintViewTcpProvider: FingerprintViewTcpProvider,
    ) {}

    getTcpStreamsTotal = async (query: ITcpStreamFilter): Promise<number> => {
        const streamsFilter = this.createStreamsFilter(query);
        const streamIds = await filter(await this.getStreamIds(), streamsFilter);

        return streamIds.length;
    };

    getTcpStreams = async (query: ITcpStreamFilter): Promise<ITcpStreamView[]> => {
        const streamsFilter = this.createStreamsFilter(query);
        const streamIds = await this.getStreamIds();
        const sortedStreamIds = await this.sortStreams(query, streamIds);
        const filteredStreamIds = await filter(sortedStreamIds, streamsFilter);

        const current = query.current ? Number.parseInt(query.current, 10) - 1 : 0;
        const take = query.take ? Number.parseInt(query.take, 10) : 15;
        const skip = current * take;
        const selectedPageStreamIds = filteredStreamIds.slice(skip, skip + take);

        const streamPromises = selectedPageStreamIds.map(async (streamId: string): Promise<Nullable<ITcpStreamView>> => {
            const { syn, synAck } = await this.packetViewTcpProvider.getTcpHandshakePacketsByStreamId(streamId);
            const { request, response } = await this.packetViewHttpProvider.getHttpRequestAndResponsePacketsByStream(streamId);
            const tlsClientHello = await this.packetViewTlsProvider.getClientHelloByStreamId(streamId);
            const streamMetaData = await this.getTcpStreamMetaDataByStreamId(streamId);
            const packetsCount = await this.getTcpStreamDocumentsCount(streamId);

            const fingerprints = await this.fingerprintViewTcpProvider.calculateFingerprints(
                syn, synAck, tlsClientHello, request, response,
            );

            const applicationLayerProtocols = await
                this.packetViewTcpProvider.getTcpApplicationLayersProtocolsByStreamId(streamId);

            const significantRequestPacket = syn || tlsClientHello || request;
            const significantResponsePacket = synAck || response;

            if (!significantRequestPacket && !significantResponsePacket) {
                return null;
            }

            const sourceAndDestinationInfo = this.getSourceAndDestinationInfo(
                significantRequestPacket || significantResponsePacket,
                Boolean(significantRequestPacket),
            );

            const serverNameIndication = (tlsClientHello && tlsClientHello.tls)
                ? tlsClientHello.tls.serverNameIndication
                : null;

            return {
                streamId,
                ...streamMetaData,
                ...sourceAndDestinationInfo,
                fingerprints,
                packetsCount,
                applicationLayerProtocols,
                serverNameIndication,
            }
        });

        const streams = await Promise.all(streamPromises);

        return streams.filter(Boolean);
    };

    private getSourceAndDestinationInfo(packet: IPacketViewTcp, isRequest: boolean) {
        if (isRequest) {
            return {
                sourceMac: packet.eth ? packet.eth.sourceMac : null,
                sourceIp: packet.ip ? packet.ip.sourceIp : null,
                sourcePort: packet.tcp ? packet.tcp.sourcePort : null,
                destinationIp: packet.ip ? packet.ip.destinationIp : null,
                destinationPort: packet.tcp ? packet.tcp.destinationPort : null,
            }
        }

        return {
            sourceMac: packet.eth ? packet.eth.destinationMac : null,
            sourceIp: packet.ip ? packet.ip.destinationIp : null,
            sourcePort: packet.tcp ? packet.tcp.destinationPort : null,
            destinationIp: packet.ip ? packet.ip.sourceIp : null,
            destinationPort: packet.tcp ? packet.tcp.sourcePort : null,
        }
    }

    private sortStreams = async (query: ITcpStreamFilter, streamIds: string[]) => {
        const dateTimeFromOrder = query.dateTimeFromOrder === TcpStreamFilterDateOrder.Asc
            ? TcpStreamFilterDateOrder.Asc
            : TcpStreamFilterDateOrder.Desc;

        const streamPromises = streamIds.map(async (streamId: string): Promise<any> => {
            const meta = await this.getTcpStreamMetaDataByStreamId(streamId);

            return {
                streamId,
                ...meta,
            }
        });
        const streamsMetaData = await Promise.all(streamPromises);

        if (dateTimeFromOrder === TcpStreamFilterDateOrder.Asc) {
            streamsMetaData.sort((a, b) => compareIsoDates(a.startDateTime, b.startDateTime));
        }
        if (dateTimeFromOrder === TcpStreamFilterDateOrder.Desc) {
            streamsMetaData.sort((a, b) => -1 * compareIsoDates(a.startDateTime, b.startDateTime));
        }
        if (query.dateTimeToOrder === TcpStreamFilterDateOrder.Asc) {
            streamsMetaData.sort((a, b) => compareIsoDates(a.endDateTime, b.endDateTime));
        }
        if (query.dateTimeToOrder === TcpStreamFilterDateOrder.Desc) {
            streamsMetaData.sort((a, b) => -1 * compareIsoDates(a.endDateTime, b.endDateTime));
        }

        return streamsMetaData.map(x => x.streamId);
    };

    private createStreamsFilter = (query: ITcpStreamFilter) => {
        return async (streamId: string) => {
            if (query.dateTimeFrom || query.dateTimeTo) {
                const { endDateTime, startDateTime } = await this.getTcpStreamMetaDataByStreamId(streamId);

                if (query.dateTimeFrom) {
                    if (!startDateTime) {
                        return false;
                    }
                    const comparisionResult = compareIsoDates(startDateTime, query.dateTimeFrom);

                    if (comparisionResult < 0) {
                        return false;
                    }
                }

                if (query.dateTimeTo) {
                    if (!endDateTime) {
                        return false;
                    }
                    const comparisionResult = compareIsoDates(query.dateTimeTo, endDateTime);

                    if (comparisionResult < 0) {
                        return false;
                    }
                }
            }

            const { syn } = await this.packetViewTcpProvider.getTcpHandshakePacketsByStreamId(streamId);

            if (!syn) {
                return !(query.sourceIp || query.sourceMac || query.sourcePort
                    || query.destinationIp || query.destinationMac || query.destinationPort);
            }

            const {
                tcp: { sourcePort, destinationPort },
                ip: { sourceIp, destinationIp },
                eth: { destinationMac, sourceMac },
            } = syn;

            if (query.sourceIp && !query.sourceIp.includes(sourceIp)) {
                return false;
            }
            if (query.sourcePort && !query.sourcePort.includes(sourcePort.toString())) {
                return false;
            }
            if (query.sourceMac && !query.sourceMac.includes(sourceMac)) {
                return false;
            }

            if (query.destinationIp && !query.destinationIp.includes(destinationIp)) {
                return false;
            }
            if (query.destinationPort && !query.destinationPort.includes(destinationPort.toString())) {
                return false;
            }

            return !(query.destinationMac && !query.destinationMac.includes(destinationMac));
        };
    };

    private getTcpStreamMetaDataByStreamId = async (streamId: string): Promise<ITcpStreamMetaData> => {
        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                body: {
                    ...TcpStreamViewProviderQueries.buildTcpStreamMetaDataQuery(streamId),
                },
            })
            .pipe(map(TcpStreamViewProviderMappers.toTcpStreamMetaData))
            .toPromise();
    };

    private getTcpStreamDocumentsCount = async (streamId: string): Promise<number> => {
        return this.elasticsearchService
            .count({
                index: 'packets-*',
                body: TcpStreamViewProviderQueries.buildTcpStreamDocumentCountQuery(streamId),
            })
            .pipe(map(TcpStreamViewProviderMappers.toTcpStreamDocumentCount))
            .toPromise();
    };

    private getStreamIds = async (): Promise<string[]> => {
        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 0,
                body: {
                    ...TcpStreamViewProviderQueries.buildTcpStreamIdsQuery(),
                },
            })
            .pipe(map(TcpStreamViewProviderMappers.toStreamIds))
            .toPromise();
    };
}
