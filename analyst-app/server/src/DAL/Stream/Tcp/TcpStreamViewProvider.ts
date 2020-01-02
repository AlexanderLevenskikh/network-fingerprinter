import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ITcpStreamHandshakePackets } from './ITcpStreamHandshakePackets';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { TcpStreamViewProviderQueries } from './TcpStreamViewProviderQueries';
import { TcpStreamViewProviderMappers } from './TcpStreamViewProviderMappers';
import { ITcpStreamView } from './ITcpStreamView';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';
import { getApplicationLayerProtocolByFrame } from '../../../Mappers/Stream/Frame/ApplicationLayerProtocolByFrame';
import { IPacketViewTcp } from '../../Packet/Tcp/IPacketViewTcp';
import { Nullable } from '../../../Shared/Types/Nullable';
import { tcpFingerprintProcessor, TcpFingerprintProcessorPacketType } from '../../../Processors/Fingerprint/Tcp/Tcp';
import { TcpPacketViewProviderMappers } from '../../Packet/Tcp/TcpPacketViewProviderMappers';
import { HttpStreamViewProvider } from '../Http/HttpStreamViewProvider';
import {
    httpFingerprintProcessor,
    HttpFingerprintProcessorPacketType,
} from '../../../Processors/Fingerprint/Http/Http';
import { IFingerprints } from '../../../Processors/Fingerprint/IFingerprints';
import { TlsPacketViewProvider } from '../../Packet/Tls/tls-packet-view-provider.service';
import { tlsFingerprintProcessor } from '../../../Processors/Fingerprint/Tls/Tls';
import { ITcpStreamFilter } from './ITcpStreamFilter';
import { compareIsoDates } from '../../../Shared/Utils/compareIsoDates';
import { filter } from '../../../Shared/Utils/filter';
import { TcpStreamFilterDateOrder } from './TcpStreamFilterDateOrder';

@Injectable()
export class TcpStreamViewProvider {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
        private readonly httpStreamViewProvider: HttpStreamViewProvider,
        private readonly tlsPacketViewProvider: TlsPacketViewProvider,
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
        const skippedStreamIds = filteredStreamIds.slice(skip, skip + take);

        const streamPromises = skippedStreamIds.map(async (streamId: string): Promise<ITcpStreamView> => {
            const { syn, synAck } = await this.getTcpHandshakePacketsByStreamId(streamId);
            const { request, response } = await this.httpStreamViewProvider.getHttpRequestAndResponsePacketsByStream(streamId);
            const tlsClientHello = await this.tlsPacketViewProvider.getClientHelloByStreamId(streamId);
            const sample = await this.getTcpSamplePacketByStreamId(streamId);
            const streamMetaData = await this.getTcpStreamMetaDataByStreamId(streamId);
            const packetsCount = await this.getTcpStreamDocumentsCount(streamId);

            const sourceTcpFingerprint = syn ? tcpFingerprintProcessor(syn, TcpFingerprintProcessorPacketType.Syn) : null;
            const sourceHttpFingerprints = request ? httpFingerprintProcessor(request, HttpFingerprintProcessorPacketType.Request) : null;
            const sourceTlsFingerprints = tlsClientHello ? tlsFingerprintProcessor(tlsClientHello) : null;
            const sourceFingerprints: IFingerprints = {
                tcp: sourceTcpFingerprint,
                http: sourceHttpFingerprints,
                tls: sourceTlsFingerprints,
            };
            const destinationTcpFingerprint = synAck ? tcpFingerprintProcessor(synAck, TcpFingerprintProcessorPacketType.SynAck) : null;
            const destinationHttpFingerprints = response ? httpFingerprintProcessor(response, HttpFingerprintProcessorPacketType.Response) : null;
            const destinationFingerprints: IFingerprints = {
                tcp: destinationTcpFingerprint,
                http: destinationHttpFingerprints,
            };

            const packetForAddressesCalculation = syn || synAck || sample;

            const sourceMac = (packetForAddressesCalculation && packetForAddressesCalculation.eth)
                ? packetForAddressesCalculation.eth.sourceMac
                : null;
            const sourceIp = (packetForAddressesCalculation && packetForAddressesCalculation.ip)
                ? packetForAddressesCalculation.ip.sourceIp
                : null;
            const sourcePort = (packetForAddressesCalculation && packetForAddressesCalculation.tcp)
                ? packetForAddressesCalculation.tcp.sourcePort
                : null;
            const destinationMac = (packetForAddressesCalculation && packetForAddressesCalculation.eth)
                ? packetForAddressesCalculation.eth.destinationMac
                : null;
            const destinationIp = (packetForAddressesCalculation && packetForAddressesCalculation.ip)
                ? packetForAddressesCalculation.ip.destinationIp
                : null;
            const destinationPort = (packetForAddressesCalculation && packetForAddressesCalculation.tcp)
                ? packetForAddressesCalculation.tcp.destinationPort
                : null;

            return {
                streamId,
                ...streamMetaData,
                sourceMac,
                sourceIp,
                sourcePort,
                sourceFingerprints,
                destinationMac,
                destinationIp,
                destinationPort,
                destinationFingerprints,
                packetsCount,
                applicationLayerProtocol: (sample && sample.frame) ? getApplicationLayerProtocolByFrame(sample.frame) : null,
                serverNameIndication: (tlsClientHello && tlsClientHello.tls) ? tlsClientHello.tls.serverNameIndication : null,
            }
        });

        return await Promise.all(streamPromises);
    };

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

            const { syn } = await this.getTcpHandshakePacketsByStreamId(streamId);

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

    private getTcpHandshakePacketsByStreamId = async (streamId: string): Promise<ITcpStreamHandshakePackets> => {
        const synPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...TcpStreamViewProviderQueries.buildTcpSynByStreamIdQuery(streamId),
                },
            })
            .pipe(map(TcpPacketViewProviderMappers.toTcpPacketViews))
            .toPromise();

        const synAckPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...TcpStreamViewProviderQueries.buildTcpSynAckByStreamIdQuery(streamId),
                },
            })
            .pipe(map(TcpPacketViewProviderMappers.toTcpPacketViews))
            .toPromise();

        return {
            streamId,
            syn: synPacket.length > 0 ? synPacket[ 0 ] : null,
            synAck: synAckPacket.length > 0 ? synAckPacket[ 0 ] : null,
        };
    };

    private getTcpSamplePacketByStreamId = async (streamId: string): Promise<Nullable<IPacketViewTcp>> => {
        const sample = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...TcpStreamViewProviderQueries.buildTcpPacketSampleByStreamIdQuery(streamId),
                },
            })
            .pipe(map(TcpPacketViewProviderMappers.toTcpPacketViews))
            .toPromise();

        return sample.length > 0 ? sample[ 0 ] : null;
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
