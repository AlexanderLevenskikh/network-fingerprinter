import { SearchResponse } from 'elasticsearch';
import { ITcpSourceStatisticsView } from './ITcpSourceStatisticsView';
import { TcpStreamViewProviderMappers } from '../../Stream/Tcp/TcpStreamViewProviderMappers';

export class TcpStatisticsViewProviderMappers {
    public static toSourcesStatistics(response: SearchResponse<any>): ITcpSourceStatisticsView[] {
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
