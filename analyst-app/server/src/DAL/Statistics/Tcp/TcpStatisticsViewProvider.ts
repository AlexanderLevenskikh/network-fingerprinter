import { Injectable } from '@nestjs/common';
import { ITcpSourceStatisticsView } from './ITcpSourceStatisticsView';
import { ITcpSourceStatisticsDetailsView } from './ITcpSourceStatisticsDetailsView';
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

@Injectable()
export class TcpStatisticsViewProvider {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
        private readonly packetViewHttpProvider: PacketViewHttpProvider,
        private readonly packetViewTlsProvider: PacketViewTlsProvider,
        private readonly packetViewTcpProvider: PacketViewTcpProvider,
        private readonly fingerprintViewTcpProvider: FingerprintViewTcpProvider,
    ) {}

    public getSourcesStatistics = (): Promise<ITcpSourceStatisticsView[]> => {
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

    public getSourceStatisticsDetails = async (
        ip: string,
        mac: string,
    ): Promise<ITcpSourceStatisticsDetailsView> => {
        const streamIds = await this.elasticsearchService
            .search<IPacketEntity>({
                index: 'packets-*',
                body: {
                    ...TcpStatisticsViewProviderQueries.buildSourceStreamsIdsQuery(ip, mac),
                },
            })
            .pipe(map(TcpStreamViewProviderMappers.toStreamIds))
            .toPromise();

        const promises = streamIds.map(async (streamId) => {
            const syn = await this.packetViewTcpProvider.getSynByStreamId(streamId);
            const request = await this.packetViewHttpProvider.getHttpRequestByStreamId(streamId);
            const tlsClientHello = await this.packetViewTlsProvider.getClientHelloByStreamId(streamId);

            return {
                fingerprints: this.fingerprintViewTcpProvider.calculateSourceFingerprints(
                    syn, tlsClientHello, request,
                ),
                hasTlsClientHello: Boolean(tlsClientHello),
                hasHttpRequest: Boolean(request),
            };
        });
        const fingerprints = await Promise.all(promises);

        const tcpFingerprintsSet = new Set<string>();
        const tlsFingerprintsSet = new Set<string>();
        const httpFingerprintsSet = new Set<string>();
        let hasTlsClientHello = false;
        let hasHttpRequest = false;

        fingerprints.forEach(fingerprint => {
            const { fingerprints: { http, tcp, tls } } = fingerprint;

            if (tcp) {
                tcpFingerprintsSet.add(`${tcp.name}:${tcp.flavour}`);
            }

            if (tls) {
                tlsFingerprintsSet.add(tls.userAgent);
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
            httpFingerprints: Array.from(httpFingerprintsSet),
        }
    };
}
