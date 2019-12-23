import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { map } from 'rxjs/operators';
import { IPacketEntity } from '../../Entities/Packet/IPacketEntity';
import { IPacketView } from './IPacketView';
import { PacketViewProviderMappers } from './PacketViewProviderMappers';

@Injectable()
export class PacketViewProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    getPackets = async (): Promise<IPacketView[]> => {
        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1000,
                body: {
                    query: {
                        exists: {
                            field: 'layers.tcp',
                        },
                    },
                },
            })
            .pipe(map(PacketViewProviderMappers.toPacketViews))
            .toPromise();
    };

    getDistinctHosts = async (isOutgoing: boolean): Promise<string[]> => {
        const field = `layers.ip.${isOutgoing ? 'ip_ip_src' : 'ip_ip_dst'}.keyword`;

        return this.elasticsearchService
            .search({
                index: 'packets-*',
                size: 0,
                body: {
                    query: {
                        exists: {
                            field: 'layers.tcp',
                        },
                    },
                    aggs: {
                        host: {
                            composite: {
                                sources: [
                                    {
                                        ip: { terms: { field } },
                                    },
                                ],
                            },
                        },
                    },
                },
            })
            .pipe(map(PacketViewProviderMappers.toHosts))
            .toPromise();
    };
}
