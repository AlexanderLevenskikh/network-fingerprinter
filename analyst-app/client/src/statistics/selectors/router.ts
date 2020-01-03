import { IState } from 'root/app/state';

export class StatisticsRouterSelectors {
    static tabName = (state: IState) => StatisticsRouterSelectors.selectSlice(state).tabName;

    private static selectSlice = (state: IState) => state.statistics.router;
}
