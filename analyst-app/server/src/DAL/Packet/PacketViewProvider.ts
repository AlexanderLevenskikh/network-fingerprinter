import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { map } from 'rxjs/operators';
import { IPacketEntity } from '../../Entities/Packet/IPacketEntity';
import { IPacketView } from './IPacketView';
import { IPacketViewTcp } from './Tcp/IPacketViewTcp';
import { PacketViewProviderQueries } from './PacketViewProviderQueries';
import { PacketViewProviderMappers } from './PacketViewProviderMappers';
import { IPacketViewTcpHandshakeGroup } from './Tcp/IPacketViewTcpHandshakeGroup';
import { IPacketViewTcpStreamWithFingerprint } from './Tcp/IPacketViewTcpStreamWithFingerprint';

export enum PacketViewProviderTransportLayerProto {
    Udp,
    Tcp,
}

@Injectable()
export class PacketViewProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    getHandshakeTcpPackets = async (): Promise<IPacketViewTcp[]> => {
        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1000,
                body: {
                    query: {
                        ...PacketViewProviderQueries.tcpSynOrSynAck,
                    },
                },
            })
            .pipe(map(PacketViewProviderMappers.toTcpPacketViews))
            .toPromise();
    };

    getTcpStreamsWithFingerprints = async (): Promise<IPacketViewTcpStreamWithFingerprint[]> => {
        const streamIds = await this.getStreamIds(PacketViewProviderTransportLayerProto.Tcp);
        const handshakeGroupsPromises = streamIds.map(this.getHandshakeGroupByStreamId);
        const handshakeGroups = await Promise.all(handshakeGroupsPromises);

        return handshakeGroups.map(group => ({
            ...group,
            os: 'windows',
        }));
    };

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

    private getHandshakeGroupByStreamId = async (streamId: number): Promise<IPacketViewTcpHandshakeGroup> => {
        const synPacket = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 1,
                body: {
                    query: {
                        ...PacketViewProviderQueries.buildTcpSynByStreamIdQuery(streamId),
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
                        ...PacketViewProviderQueries.buildTcpSynAckByStreamIdQuery(streamId),
                    },
                },
            })
            .pipe(map(PacketViewProviderMappers.toTcpPacketViews))
            .toPromise();

        return {
            syn: synPacket.length > 0 ? synPacket[ 0 ] : null,
            synAck: synAckPacket.length > 0 ? synAckPacket[ 0 ] : null,
        };
    };

    private getStreamIds = async (
        transportLayerProto: PacketViewProviderTransportLayerProto,
    ): Promise<number[]> => {
        const streamField = transportLayerProto === PacketViewProviderTransportLayerProto.Tcp
            ? 'layers.tcp.tcp_tcp_stream.keyword'
            : 'layers.udp.udp_udp_stream.keyword';

        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                size: 0,
                body: {
                    aggs: {
                        by_stream: {
                            composite: {
                                sources : [
                                    {
                                        stream: {
                                            terms: {
                                                field: streamField,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            })
            .pipe(map(PacketViewProviderMappers.toStreamIds))
            .toPromise();
    };
}
