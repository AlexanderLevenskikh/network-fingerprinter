import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { ITcpRequestStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpRequestStatisticsDetailsView';
import { ITcpResponseStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpResponseStatisticsDetailsView';

export interface ITcpStatisticsApi {
    getRequestStatistics(): Promise<ITcpHostStatisticsView[]>;

    getRequestStatisticsDetails(
        mac: string,
        ip: string,
    ): Promise<ITcpRequestStatisticsDetailsView>;

    getResponseStatistics(): Promise<ITcpHostStatisticsView[]>;

    getResponseStatisticsDetails(
        mac: string,
        ip: string,
    ): Promise<ITcpResponseStatisticsDetailsView>;
}
