import { IState } from 'root/app/state';

export class TcpStatisticsListSelectors {
    static requests = (state: IState) => TcpStatisticsListSelectors.selectSlice(state).requests;
    static responses = (state: IState) => TcpStatisticsListSelectors.selectSlice(state).responses;
    static requestsLoading = (state: IState) => TcpStatisticsListSelectors.selectSlice(state).requestsLoading;
    static responsesLoading = (state: IState) => TcpStatisticsListSelectors.selectSlice(state).responsesLoading;

    private static selectSlice = (state: IState) => state.statistics.list;
}
