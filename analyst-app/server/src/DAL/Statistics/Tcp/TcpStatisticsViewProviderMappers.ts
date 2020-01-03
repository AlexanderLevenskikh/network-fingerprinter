import { SearchResponse } from 'elasticsearch';
import { ITcpHostStatisticsView } from './ITcpHostStatisticsView';
import { TcpStreamViewProviderMappers } from '../../Stream/Tcp/TcpStreamViewProviderMappers';

export class TcpStatisticsViewProviderMappers {
    public static toSourcesStatistics(response: SearchResponse<any>): ITcpHostStatisticsView[] {
        if (!response[0].aggregations) {
            return [];
        }

        return response[0]
            .aggregations
            .source
            .buckets
            .map(({ key }) => {
                return {
                    ip: key.ip,
                    mac: key.mac,
                }
            });
    }
}
