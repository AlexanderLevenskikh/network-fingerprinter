import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class TcpStreamViewProvider {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
        private readonly httpStreamViewProvider: HttpStreamViewProvider,
    ) {}

    getTcpStreams = async (): Promise<ITcpStreamView[]> => {
        const streamIds = await this.getStreamIds();
        const streamPromises = streamIds.map(async (streamId): Promise<ITcpStreamView> => {
            const { syn, synAck } = await this.getTcpHandshakePacketsByStreamId(streamId);
            const { request, response } = await this.httpStreamViewProvider.getHttpRequestAndResponsePacketsByStream(streamId);
            const sample = await this.getTcpSamplePacketByStreamId(streamId);
            const streamMetaData = await this.getTcpStreamMetaDataByStreamId(streamId);
            const packetsCount = await this.getTcpStreamDocumentsCount(streamId);

            const sourceTcpFingerprint = syn ? tcpFingerprintProcessor(syn, TcpFingerprintProcessorPacketType.Syn) : null;
            const sourceHttpFingerprints = request ? httpFingerprintProcessor(request, HttpFingerprintProcessorPacketType.Request) : null;
            const sourceFingerprints: IFingerprints = {
                tcp: sourceTcpFingerprint,
                http: sourceHttpFingerprints,
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
            }
        });
        return await Promise.all(streamPromises);
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
