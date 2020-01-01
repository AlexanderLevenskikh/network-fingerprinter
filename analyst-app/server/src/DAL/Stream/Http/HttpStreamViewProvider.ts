import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IHttpStreamRequestAndResponsePackets } from './IHttpStreamRequestAndResponsePackets';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { HttpStreamViewProviderQueries } from './HttpStreamViewProviderQueries';
import { HttpPacketViewProviderMappers } from '../../Packet/Http/HttpPacketViewProviderMappers';

@Injectable()
export class HttpStreamViewProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    public getHttpRequestAndResponsePacketsByStream = async (streamId: string): Promise<IHttpStreamRequestAndResponsePackets> => {
        const requestPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...HttpStreamViewProviderQueries.buildHttpRequestQueryByStreamId(streamId),
                },
            })
            .pipe(map(HttpPacketViewProviderMappers.toHttpPacketViews))
            .toPromise();

        const responsePacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...HttpStreamViewProviderQueries.buildHttpResponseQueryByStreamId(streamId),
                },
            })
            .pipe(map(HttpPacketViewProviderMappers.toHttpPacketViews))
            .toPromise();

        return {
            streamId,
            request: requestPacket.length > 0 ? requestPacket[0] : null,
            response: responsePacket.length > 0 ? responsePacket[0] : null,
        };
    };
}
