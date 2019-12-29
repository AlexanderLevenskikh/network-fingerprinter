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
    HttpFingerprintProcessorPacketType
} from '../../../Processors/Fingerprint/Http/Http';
import { IFingerprints } from '../../../Processors/Fingerprint/IFingerprints';
import { TlsPacketViewProvider } from '../../Packet/Tls/tls-packet-view-provider.service';
import { tlsFingerprintProcessor } from '../../../Processors/Fingerprint/Tls/Tls';
import { ITcpStreamFilter } from './ITcpStreamFilter';
import { compareIsoDates } from '../../../Shared/Utils/compareIsoDates';
import { filter } from '../../../Shared/Utils/filter';
import { notEmpty } from '../../../Shared/Utils/notEmpty';

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
        const streamIds = await filter(await this.getStreamIds(), streamsFilter);

        const current = query.current ? Number.parseInt(query.current, 10) - 1 : 0;
        const take = query.take ? Number.parseInt(query.take, 10) : 15;
        const skip = current * take;
        const skippedStreamIds = streamIds.slice(skip, skip + take);

        const streamPromises = skippedStreamIds.map(async (streamId: number): Promise<ITcpStreamView> => {
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

            return {
                streamId,
                ...streamMetaData,
                sourceMac: (syn && syn.eth) ? syn.eth.sourceMac : null,
                sourceIp: (syn && syn.ip) ? syn.ip.sourceIp : null,
                sourcePort: (syn && syn.tcp) ? syn.tcp.sourcePort : null,
                sourceFingerprints,
                destinationMac: (syn && syn.eth) ? syn.eth.destinationMac : null,
                destinationIp: (syn && syn.ip) ? syn.ip.destinationIp : null,
                destinationPort: (syn && syn.tcp) ? syn.tcp.destinationPort : null,
                destinationFingerprints,
                packetsCount,
                applicationLayerProtocol: (sample && sample.frame) ? getApplicationLayerProtocolByFrame(sample.frame) : null,
                serverNameIndication: (tlsClientHello && tlsClientHello.tls) ? tlsClientHello.tls.serverNameIndication : null,
            }
        });
        return await Promise.all(streamPromises);
    };

    private createStreamsFilter = (query: ITcpStreamFilter) => {
        return async (streamId: number) => {
            if (query.dateTimeFrom || query.dateTimeTo) {
                const { endDateTime, startDateTime } = await this.getTcpStreamMetaDataByStreamId(streamId);

                if (query.dateTimeFrom) {
                    if (!startDateTime) {
                        return false;
                    }
                    const comparisionResult = compareIsoDates(startDateTime, query.dateTimeFrom);

                    if (comparisionResult === -1) {
                        return false;
                    }
                }

                if (query.dateTimeTo) {
                    if (!endDateTime) {
                        return false;
                    }
                    const comparisionResult = compareIsoDates(query.dateTimeTo, endDateTime);

                    if (comparisionResult === -1) {
                        return false;
                    }
                }
            }

            const { syn } = await this.getTcpHandshakePacketsByStreamId(streamId);
            if (!syn && (query.sourceIp || query.sourceMac || query.sourcePort
                || query.destinationIp || query.destinationMac || query.destinationPort)
            ) {
                return false;
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

    private getTcpHandshakePacketsByStreamId = async (streamId: number): Promise<ITcpStreamHandshakePackets> => {
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

    private getTcpSamplePacketByStreamId = async (streamId: number): Promise<Nullable<IPacketViewTcp>> => {
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

    private getTcpStreamMetaDataByStreamId = async (streamId: number): Promise<ITcpStreamMetaData> => {
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

    private getTcpStreamDocumentsCount = async (streamId: number): Promise<number> => {
        return this.elasticsearchService
            .count({
                index: 'packets-*',
                body: TcpStreamViewProviderQueries.buildTcpStreamDocumentCountQuery(streamId),
            })
            .pipe(map(TcpStreamViewProviderMappers.toTcpStreamDocumentCount))
            .toPromise();
    };

    private getStreamIds = async (size: number = 15): Promise<number[]> => {
        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 0,
                body: {
                    ...TcpStreamViewProviderQueries.buildTcpStreamIdsQuery(size),
                },
            })
            .pipe(map(TcpStreamViewProviderMappers.toStreamIds))
            .toPromise();
    };
}
