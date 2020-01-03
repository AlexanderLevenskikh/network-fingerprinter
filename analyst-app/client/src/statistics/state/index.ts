import { TcpStatisticsRouterState } from 'root/statistics/state/router';
import { TcpStatisticsListState } from 'root/statistics/state/list';
import { TcpStatisticsDetailsState } from 'root/statistics/state/details';

export class TcpStatisticsState {
    list: TcpStatisticsListState = new TcpStatisticsListState();
    details: TcpStatisticsDetailsState = new TcpStatisticsDetailsState();
    router: TcpStatisticsRouterState = new TcpStatisticsRouterState();
}
