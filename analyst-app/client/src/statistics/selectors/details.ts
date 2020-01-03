import { IState } from 'root/app/state';

export class TcpStatisticsDetailsSelectors {
    static destinationDetails = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).destinationDetails;
    static destinationDetailsLoading = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).destinationDetailsLoading;
    static destinationDetailsDrawerOpened = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).destinationDetailsDrawerOpened;
    static sourceIp = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).sourceIp;
    static sourceMac = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).sourceMac;

    static sourceDetails = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).sourceDetails;
    static sourceDetailsLoading = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).sourceDetailsLoading;
    static sourceDrawerOpened = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).sourceDrawerOpened;
    static destinationIp = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).destinationIp;

    private static selectSlice = (state: IState) => state.statistics.details;
}
