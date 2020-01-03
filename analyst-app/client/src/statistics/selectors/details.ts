import { IState } from 'root/app/state';

export class TcpStatisticsDetailsSelectors {
    static requestIp = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).requestIp;
    static requestMac = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).requestMac;
    static requestDetails = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).requestDetails;
    static requestDetailsLoading = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).requestDetailsLoading;
    static requestDrawerOpened = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).requestDrawerOpened;

    static responseIp = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).responseIp;
    static responseMac = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).responseMac;
    static responseDetails = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).responseDetails;
    static responseDetailsLoading = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).responseDetailsLoading;
    static responseDrawerOpened = (state: IState) => TcpStatisticsDetailsSelectors.selectSlice(state).responseDrawerOpened;

    private static selectSlice = (state: IState) => state.statistics.details;
}
