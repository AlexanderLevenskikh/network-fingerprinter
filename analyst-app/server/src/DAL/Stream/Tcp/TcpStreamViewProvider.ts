import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ITcpStreamHandshakePackets } from './ITcpStreamHandshakePackets';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { PacketViewProviderMappers } from '../../Packet/PacketViewProviderMappers';
import { TcpStreamViewProviderQueries } from './TcpStreamViewProviderQueries';
import { TcpStreamViewProviderMappers } from './TcpStreamViewProviderMappers';
import { ITcpStreamView } from './ITcpStreamView';

@Injectable()
export class TcpStreamViewProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    getTcpStreams = async (): Promise<ITcpStreamView[]> => {
        const streamIds = await this.getStreamIds();
        const handshakePacketsPromises = streamIds.map(this.getTcpHandshakePacketsByStreamId);
        const handshakePackets = await Promise.all(handshakePacketsPromises);

        return handshakePackets.map(group => ({
            ...group,
            os: 'windows',
        }));
    };

    private getTcpHandshakePacketsByStreamId = async (streamId: number): Promise<ITcpStreamHandshakePackets> => {
        const synPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    query: {
                        ...TcpStreamViewProviderQueries.buildTcpSynByStreamIdQuery(streamId),
                    },
                },
            })
            .pipe(map(PacketViewProviderMappers.toTcpPacketViews))
            .toPromise();

        const synAckPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    query: {
                        ...TcpStreamViewProviderQueries.buildTcpSynAckByStreamIdQuery(streamId),
                    },
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
