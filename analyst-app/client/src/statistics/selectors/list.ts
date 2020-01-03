import { IState } from 'root/app/state';

export class TcpStatisticsListSelectors {
    static sources = (state: IState) => TcpStatisticsListSelectors.selectSlice(state).sources;
    static destinations = (state: IState) => TcpStatisticsListSelectors.selectSlice(state).destinations;
    static sourcesLoading = (state: IState) => TcpStatisticsListSelectors.selectSlice(state).sourcesLoading;
    static destinationsLoading = (state: IState) => TcpStatisticsListSelectors.selectSlice(state).destinationsLoading;

    private static selectSlice = (state: IState) => state.statistics.list;
}
