import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IPacketViewHttpRequestAndResponsePackets } from './IPacketViewHttpRequestAndResponsePackets';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { PacketViewHttpProviderQueries } from './PacketViewHttpProviderQueries';
import { PacketViewHttpProviderMappers } from './PacketViewHttpProviderMappers';

@Injectable()
export class PacketViewHttpProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    public getHttpRequestAndResponsePacketsByStream = async (streamId: string): Promise<IPacketViewHttpRequestAndResponsePackets> => {
        const requestPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewHttpProviderQueries.buildHttpRequestQueryByStreamId(streamId),
                },
            })
            .pipe(map(PacketViewHttpProviderMappers.toHttpPacketViews))
            .toPromise();

        const responsePacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewHttpProviderQueries.buildHttpResponseQueryByStreamId(streamId),
                },
            })
            .pipe(map(PacketViewHttpProviderMappers.toHttpPacketViews))
            .toPromise();

        return {
            streamId,
            request: requestPacket.length > 0 ? requestPacket[0] : null,
            response: responsePacket.length > 0 ? responsePacket[0] : null,
        };
    };
}
