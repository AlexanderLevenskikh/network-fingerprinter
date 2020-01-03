import { Injectable } from '@nestjs/common';
import { ITcpHostStatisticsView } from './ITcpHostStatisticsView';
import { ITcpRequestStatisticsDetailsView } from './ITcpRequestStatisticsDetailsView';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { map } from 'rxjs/operators';
import { TcpStatisticsViewProviderQueries } from './TcpStatisticsViewProviderQueries';
import { TcpStatisticsViewProviderMappers } from './TcpStatisticsViewProviderMappers';
import { TcpStreamViewProviderMappers } from '../../Stream/Tcp/TcpStreamViewProviderMappers';
import { PacketViewHttpProvider } from '../../Packet/Http/PacketViewHttpProvider';
import { PacketViewTlsProvider } from '../../Packet/Tls/PacketViewTlsProvider';
import { PacketViewTcpProvider } from '../../Packet/Tcp/PacketViewTcpProvider';
import { FingerprintViewTcpProvider } from '../../Fingerprint/Tcp/FingerprintViewTcpProvider';
import { ITcpResponseStatisticsDetailsView } from './ITcpResponseStatisticsDetailsView';

@Injectable()
export class TcpStatisticsViewProvider {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
        private readonly packetViewHttpProvider: PacketViewHttpProvider,
        private readonly packetViewTlsProvider: PacketViewTlsProvider,
        private readonly packetViewTcpProvider: PacketViewTcpProvider,
        private readonly fingerprintViewTcpProvider: FingerprintViewTcpProvider,
    ) {}

    public getRequestStatistics = (): Promise<ITcpHostStatisticsView[]> => {
        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                body: {
                    ...TcpStatisticsViewProviderQueries.buildSourcesStatisticsQuery(),
                },
            })
            .pipe(map(TcpStatisticsViewProviderMappers.toSourcesStatistics))
            .toPromise();
    };

    public getResponseStatistics = (): Promise<ITcpHostStatisticsView[]> => {
        return this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                body: {
                    ...TcpStatisticsViewProviderQueries.buildDestinationsStatisticsQuery(),
                },
            })
            .pipe(map(TcpStatisticsViewProviderMappers.toSourcesStatistics))
            .toPromise();
    };

    public getRequestStatisticsDetails = async (
        ip: string,
        mac: string,
    ): Promise<ITcpRequestStatisticsDetailsView> => {
        const streamIds = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                body: {
                    ...TcpStatisticsViewProviderQueries.buildRequestDetailsStatisticsQuery(ip, mac),
                },
            })
            .pipe(map(TcpStreamViewProviderMappers.toStreamIds))
            .toPromise();

        const promises = streamIds.map(async (streamId) => {
            const syn = await this.packetViewTcpProvider.getSynByStreamId(streamId);
            const request = await this.packetViewHttpProvider.getHttpRequestByStreamId(streamId);
            const tlsClientHello = await this.packetViewTlsProvider.getClientHelloByStreamId(streamId);

            return {
                fingerprints: this.fingerprintViewTcpProvider.calculateRequestsFingerprints(
                    syn, tlsClientHello, request,
                ),
                hasTlsClientHello: Boolean(tlsClientHello),
                hasHttpRequest: Boolean(request),
            };
        });
        const fingerprints = await Promise.all(promises);

        const tcpFingerprintsSet = new Set<string>();
        const tlsFingerprintsSet = new Set<string>();
        const sslBlacklistsSet = new Set<string>();
        const httpFingerprintsSet = new Set<string>();
        let hasTlsClientHello = false;
        let hasHttpRequest = false;

        fingerprints.forEach(fingerprint => {
            const { fingerprints: { http, tcp, tls } } = fingerprint;

            if (tcp) {
                tcpFingerprintsSet.add(`${tcp.name}:${tcp.flavour}`);
            }

            if (tls) {
                tls.userAgent.forEach(userAgent => {
                    tlsFingerprintsSet.add(userAgent);
                });

                if (tls.sslBlackListReason) {
                    sslBlacklistsSet.add(tls.sslBlackListReason);
                }
            }

            if (http) {
                httpFingerprintsSet.add(`${http.name}:${http.flavour}`);
            }

            if (fingerprint.hasTlsClientHello) {
                hasTlsClientHello = true;
            }

            if (fingerprint.hasHttpRequest) {
                hasHttpRequest = true;
            }
        });

        return {
            ip,
            mac,
            hasTlsClientHello,
            hasHttpRequest,
            tcpFingerprints: Array.from(tcpFingerprintsSet),
            tlsFingerprints: Array.from(tlsFingerprintsSet),
            sslBlackListReasons: Array.from(sslBlacklistsSet),
            httpFingerprints: Array.from(httpFingerprintsSet),
        }
    };

    public getResponseStatisticsDetails = async (
        ip: string,
        mac: string,
    ): Promise<ITcpResponseStatisticsDetailsView> => {
        const streamIds = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                body: {
                    ...TcpStatisticsViewProviderQueries.buildDestinationStatisticsDetailsQuery(ip, mac),
                },
            })
            .pipe(map(TcpStreamViewProviderMappers.toStreamIds))
            .toPromise();

        const promises = streamIds.map(async (streamId) => {
            const synAck = await this.packetViewTcpProvider.getSynAckByStreamId(streamId);
            const response = await this.packetViewHttpProvider.getHttpResponseByStreamId(streamId);

            return {
                fingerprints: this.fingerprintViewTcpProvider.calculateResponsesFingerprints(
                    synAck, response,
                ),
                hasHttpResponse: Boolean(response),
            };
        });
        const fingerprints = await Promise.all(promises);

        const tcpFingerprintsSet = new Set<string>();
        const httpFingerprintsSet = new Set<string>();
        let hasHttpResponse = false;

        fingerprints.forEach(fingerprint => {
            const { fingerprints: { http, tcp } } = fingerprint;

            if (tcp) {
                tcpFingerprintsSet.add(`${tcp.name}:${tcp.flavour}`);
            }

            if (http) {
                httpFingerprintsSet.add(`${http.name}:${http.flavour}`);
            }

            if (fingerprint.hasHttpResponse) {
                hasHttpResponse = true;
            }
        });

        return {
            ip,
            mac,
            hasHttpResponse,
            tcpFingerprints: Array.from(tcpFingerprintsSet),
            httpFingerprints: Array.from(httpFingerprintsSet),
        }
    };
}
