import { Injectable } from '@nestjs/common';
import { IPacketViewTcpHandshakePackets } from './IPacketViewTcpHandshakePackets';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { PacketViewTcpProviderMappers } from './PacketViewTcpProviderMappers';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IPacketViewTcp } from './IPacketViewTcp';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PacketViewTcpProviderQueries } from './PacketViewTcpProviderQueries';
import { PacketViewTcpApplicationProtocol } from './PacketViewTcpApplicationProtocol';

@Injectable()
export class PacketViewTcpProvider {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
    ) {}

    public getTcpHandshakePacketsByStreamId = async (streamId: string): Promise<IPacketViewTcpHandshakePackets> => {
        const syn = await this.getSynByStreamId(streamId);
        const synAck = await this.getSynAckByStreamId(streamId);

        return {
            streamId,
            syn,
            synAck,
        };
    };

    public getSynByStreamId = async (streamId: string): Promise<Nullable<IPacketViewTcp>> => {
        const synPackets = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewTcpProviderQueries.buildTcpSynByStreamIdQuery(streamId),
                },
            })
            .pipe(map(PacketViewTcpProviderMappers.toTcpPacketViews))
            .toPromise();

        return synPackets.length > 0 ? synPackets[ 0 ] : null
    };

    public getSynAckByStreamId = async (streamId: string): Promise<Nullable<IPacketViewTcp>> => {
        const synAckPackets = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewTcpProviderQueries.buildTcpSynAckByStreamIdQuery(streamId),
                },
            })
            .pipe(map(PacketViewTcpProviderMappers.toTcpPacketViews))
            .toPromise();

        return synAckPackets.length > 0 ? synAckPackets[ 0 ] : null
    };

    public getTcpApplicationLayersProtocolsByStreamId = async (
        streamId: string,
    ): Promise<PacketViewTcpApplicationProtocol[]> => {
        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 0,
                body: {
                    ...PacketViewTcpProviderQueries.buildTcpPacketApplicationLayersProtocolsByStreamIsQuery(streamId),
                },
            })
            .pipe(map(PacketViewTcpProviderMappers.toApplicationLayerProtocols))
            .toPromise();
    }
}
