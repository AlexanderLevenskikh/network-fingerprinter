import { Injectable } from '@nestjs/common';
import { IPacketViewTcpHandshakePackets } from './IPacketViewTcpHandshakePackets';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { PacketViewTcpProviderMappers } from './PacketViewTcpProviderMappers';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IPacketViewTcp } from './IPacketViewTcp';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PacketViewTcpProviderQueries } from './PacketViewTcpProviderQueries';

@Injectable()
export class PacketViewTcpProvider {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
    ) {}

    public getTcpHandshakePacketsByStreamId = async (streamId: string): Promise<IPacketViewTcpHandshakePackets> => {
        const synPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewTcpProviderQueries.buildTcpSynByStreamIdQuery(streamId),
                },
            })
            .pipe(map(PacketViewTcpProviderMappers.toTcpPacketViews))
            .toPromise();

        const synAckPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewTcpProviderQueries.buildTcpSynAckByStreamIdQuery(streamId),
                },
            })
            .pipe(map(PacketViewTcpProviderMappers.toTcpPacketViews))
            .toPromise();

        return {
            streamId,
            syn: synPacket.length > 0 ? synPacket[ 0 ] : null,
            synAck: synAckPacket.length > 0 ? synAckPacket[ 0 ] : null,
        };
    };

    public getTcpSamplePacketByStreamId = async (streamId: string): Promise<Nullable<IPacketViewTcp>> => {
        const sample = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewTcpProviderQueries.buildTcpPacketSampleByStreamIdQuery(streamId),
                },
            })
            .pipe(map(PacketViewTcpProviderMappers.toTcpPacketViews))
            .toPromise();

        return sample.length > 0 ? sample[ 0 ] : null;
    };
}
