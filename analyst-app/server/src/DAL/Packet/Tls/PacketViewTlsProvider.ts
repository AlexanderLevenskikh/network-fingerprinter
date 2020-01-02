import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { PacketViewTlsProviderQueries } from './PacketViewTlsProviderQueries';
import { PacketViewTlsProviderMappers } from './PacketViewTlsProviderMappers';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IPacketViewTls } from './IPacketViewTls';

@Injectable()
export class PacketViewTlsProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    public getClientHelloByStreamId = async (streamId: string): Promise<Nullable<IPacketViewTls>> => {
        const requestPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    ...PacketViewTlsProviderQueries.buildClientHelloQueryByStreamId(streamId),
                },
            })
            .pipe(map(PacketViewTlsProviderMappers.toTlsPacketViews))
            .toPromise();

        return requestPacket.length > 0 ? requestPacket[0] : null;
    };
}
