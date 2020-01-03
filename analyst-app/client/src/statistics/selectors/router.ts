import { IState } from 'root/app/state';

export class TcpStatisticsRouterSelectors {
    static tabName = (state: IState) => TcpStatisticsRouterSelectors.selectSlice(state).tabName;

    private static selectSlice = (state: IState) => state.statistics.router;
}
