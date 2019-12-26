import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ITcpStreamHandshakePackets } from './ITcpStreamHandshakePackets';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { PacketViewProviderMappers } from '../../Packet/PacketViewProviderMappers';
import { TcpStreamViewProviderQueries } from './TcpStreamViewProviderQueries';
import { TcpStreamViewProviderMappers } from './TcpStreamViewProviderMappers';
import { ITcpStreamView } from './ITcpStreamView';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';
import { getApplicationLayerProtocolByFrame } from '../../../Mappers/Stream/Frame/ApplicationLayerProtocolByFrame';
import { IPacketViewTcp } from '../../Packet/Tcp/IPacketViewTcp';
import { Nullable } from '../../../Shared/Types/Nullable';
import { TcpFingerprintProcessorPacketType, tcpFingerprintProcessor } from '../../../Processors/Fingerprinter/Tcp/Tcp';

@Injectable()
export class TcpStreamViewProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    getTcpStreams = async (): Promise<ITcpStreamView[]> => {
        const streamIds = await this.getStreamIds();
        const streamPromises = streamIds.map(async (streamId): Promise<ITcpStreamView> => {
            const { syn, synAck } = await this.getTcpHandshakePacketsByStreamId(streamId);
            const sample = await this.getTcpSamplePacketByStreamId(streamId);
            const streamMetaData = await this.getTcpStreamMetaDataByStreamId(streamId);
            const packetsCount = await this.getTcpStreamDocumentsCount(streamId);
            const sourceFingerprint = syn ? tcpFingerprintProcessor(syn, TcpFingerprintProcessorPacketType.Syn) : null;
            const destinationFingerprint = synAck ? tcpFingerprintProcessor(synAck, TcpFingerprintProcessorPacketType.SynAck) : null;

            return {
                streamId,
                ...streamMetaData,
                sourceMac: (syn && syn.eth) ? syn.eth.sourceMac : null,
                sourceIp: (syn && syn.ip) ? syn.ip.sourceIp : null,
                sourcePort: (syn && syn.tcp) ? syn.tcp.sourcePort : null,
                sourceFingerprint,
                destinationMac: (syn && syn.eth) ? syn.eth.destinationMac : null,
                destinationIp: (syn && syn.ip) ? syn.ip.destinationIp : null,
                destinationPort: (syn && syn.tcp) ? syn.tcp.destinationPort : null,
                destinationFingerprint,
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
            .pipe(map(PacketViewProviderMappers.toTcpPacketViews))
            .toPromise();

        const synAckPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...TcpStreamViewProviderQueries.buildTcpSynAckByStreamIdQuery(streamId),
                },
            })
            .pipe(map(PacketViewProviderMappers.toTcpPacketViews))
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
            .pipe(map(PacketViewProviderMappers.toTcpPacketViews))
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
