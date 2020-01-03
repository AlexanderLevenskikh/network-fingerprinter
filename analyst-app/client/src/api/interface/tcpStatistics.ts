import { ITcpSourceStatisticsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsView';
import { ITcpSourceStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsDetailsView';

export interface ITcpStatisticsApi {
    getSourcesStatistics(): Promise<ITcpSourceStatisticsView[]>;

    getSourceStatisticsDetails(
        mac: string,
        ip: string,
    ): Promise<ITcpSourceStatisticsDetailsView>;
}
