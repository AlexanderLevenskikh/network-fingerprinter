import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IPacketViewHttpRequestAndResponsePackets } from './IPacketViewHttpRequestAndResponsePackets';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { PacketViewHttpProviderQueries } from './PacketViewHttpProviderQueries';
import { PacketViewHttpProviderMappers } from './PacketViewHttpProviderMappers';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IPacketViewHttp } from './IPacketViewHttp';

@Injectable()
export class PacketViewHttpProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    public getHttpRequestAndResponsePacketsByStream = async (streamId: string): Promise<IPacketViewHttpRequestAndResponsePackets> => {
        const request = await this.getHttpRequestByStreamId(streamId);
        const response = await this.getHttpResponseByStreamId(streamId);

        return {
            streamId,
            request,
            response,
        };
    };

    public getHttpRequestByStreamId = async (streamId: string): Promise<Nullable<IPacketViewHttp>> => {
        const requestPackets = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewHttpProviderQueries.buildHttpRequestQueryByStreamId(streamId),
                },
            })
            .pipe(map(PacketViewHttpProviderMappers.toHttpPacketViews))
            .toPromise();

        return requestPackets.length > 0 ? requestPackets[0] : null
    };

    public getHttpResponseByStreamId = async (streamId: string): Promise<Nullable<IPacketViewHttp>> => {
        const responsePackets = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewHttpProviderQueries.buildHttpResponseQueryByStreamId(streamId),
                },
            })
            .pipe(map(PacketViewHttpProviderMappers.toHttpPacketViews))
            .toPromise();

        return responsePackets.length > 0 ? responsePackets[0] : null
    };
}
