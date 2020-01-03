import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';
import { ITcpStatisticsApi } from 'root/api/interface/tcpStatistics';
import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { ITcpRequestStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpRequestStatisticsDetailsView';
import { ITcpResponseStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpResponseStatisticsDetailsView';

export class TcpStatisticsApi implements ITcpStatisticsApi {
    getRequestStatistics(): Promise<ITcpHostStatisticsView[]> {
        return httpClient({
            controller: 'api/statistics/tcp',
            action: 'request',
            method: HttpClientMethod.GET,
            request: {},
            responseType: HttpClientResponseType.JSON,
        });
    }

    getRequestStatisticsDetails(
        mac: string,
        ip: string,
    ): Promise<ITcpRequestStatisticsDetailsView> {
        return httpClient({
            controller: 'api/statistics/tcp',
            action: 'request/details',
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

    getResponseStatistics(): Promise<ITcpHostStatisticsView[]> {
        return httpClient({
            controller: 'api/statistics/tcp',
            action: 'response',
            method: HttpClientMethod.GET,
            request: {},
            responseType: HttpClientResponseType.JSON,
        });
    }

    getResponseStatisticsDetails(
        mac: string,
        ip: string,
    ): Promise<ITcpResponseStatisticsDetailsView> {
        return httpClient({
            controller: 'api/statistics/tcp',
            action: 'response/details',
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
