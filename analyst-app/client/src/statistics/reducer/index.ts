import { combineReducers } from 'redux';
import { TcpStatisticsState } from 'root/statistics/state';
import { tcpStatisticsRouterReducer } from 'root/statistics/reducer/router';
import { tcpStatisticsListReducer } from 'root/statistics/reducer/list';
import { tcpStatisticsDetailsReducer } from 'root/statistics/reducer/details';

export const tcpStatisticsReducer = combineReducers<TcpStatisticsState>({
    list: tcpStatisticsListReducer,
    details: tcpStatisticsDetailsReducer,
    router: tcpStatisticsRouterReducer,
});
