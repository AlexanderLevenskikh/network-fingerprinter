import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';
import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { ITcpStreamFilter } from 'DAL/Stream/Tcp/ITcpStreamFilter';
import { ITcpStreamsView } from 'DAL/Stream/Tcp/ITcpStreamsView';
import { ITcpStatisticsApi } from 'root/api/interface/tcpStatistics';
import { ITcpSourceStatisticsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsView';
import { ITcpSourceStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsDetailsView';

export class TcpStatisticsApi implements ITcpStatisticsApi {
    getSourcesStatistics(): Promise<ITcpSourceStatisticsView[]> {
        return httpClient({
            controller: 'api/statistics/tcp',
            action: 'source',
            method: HttpClientMethod.GET,
            request: {},
            responseType: HttpClientResponseType.JSON,
        });
    }

    getSourceStatisticsDetails(
        mac: string,
        ip: string,
    ): Promise<ITcpSourceStatisticsDetailsView> {
        return httpClient({
            controller: 'api/statistics/tcp',
            action: 'source/details',
            method: HttpClientMethod.GET,
            request: {
                query: {
                    mac,
                    ip,
                }
            },
            responseType: HttpClientResponseType.JSON,
        });
    }
}
