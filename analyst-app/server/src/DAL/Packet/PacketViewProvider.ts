import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { map } from 'rxjs/operators';
import { IPacketEntity } from '../../Entities/Packet/IPacketEntity';
import { IPacketView } from './IPacketView';
import { SearchResponse } from 'elasticsearch';
import { mapPacketEntityToView } from '../../Mappers/Packet/PacketEntityToView';
import { mapPacketEntityToTcpPacketView } from '../../Mappers/Packet/Tcp/PacketEntityToView';
import { IPacketViewTcp } from './Tcp/IPacketViewTcp';

@Injectable()
export class PacketViewProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    async getHandshakeTcpPackets(): Promise<IPacketViewTcp[]> {
        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1000,
                body: {
                    query: {
                        bool: {
                            should: [
                                {
                                    bool: {
                                        must: [
                                            { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                                            { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '0' } },
                                        ],
                                    },
                                },
                                {
                                    bool: {
                                        must: [
                                            { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                                            { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '1' } },
                                        ],
                                    },
                                },
                            ],
                            minimum_should_match: 1,
                        },
                    },
                },
            })
            .pipe(map(PacketViewProvider.mapSearchResponseToTcpPacketViews))
            .toPromise();
    }

    async getDistinctHosts(isOutgoing: boolean): Promise<string[]> {
        const field = `layers.ip.${isOutgoing ? 'ip_ip_src' : 'ip_ip_dst'}.keyword`;

        return this.elasticsearchService
            .search({
                index: 'packets-*',
                body: {
                    aggs: {
                        host: {
                            composite: {
                                sources: [
                                    {
                                        ip: { terms: { field } },
                                    },
                                ],
                            }
                        },
                    },
                    size: 0,
                }
            })
            .pipe(map(PacketViewProvider.mapSearchResponseToHosts))
            .toPromise();
    }

    async getTcpPackets(): Promise<IPacketViewTcp[]> {
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
            .pipe(map(PacketViewProvider.mapSearchResponseToTcpPacketViews))
            .toPromise();
    }

    async getPackets(): Promise<IPacketView[]> {
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
            .pipe(map(PacketViewProvider.mapSearchResponseToPacketViews))
            .toPromise();
    }

    private static mapSearchResponseToHosts(response: SearchResponse<any>): string[] {
        return response[0].aggregations.host.buckets
            .map(bucket => bucket.key.ip);
    }

    private static mapSearchResponseToTcpPacketViews(response: SearchResponse<any>): IPacketViewTcp[] {
        return response[0].hits.hits
            .map(hit => mapPacketEntityToTcpPacketView(hit._source));
    }

    private static mapSearchResponseToPacketViews(response: SearchResponse<any>): IPacketView[] {
        return response[0].hits.hits
            .map(hit => mapPacketEntityToView(hit._source));
    }
}
