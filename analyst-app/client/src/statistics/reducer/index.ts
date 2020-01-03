import { combineReducers } from 'redux';
import { StatisticsState } from 'root/statistics/state';
import { statisticsRouterReducer } from 'root/statistics/reducer/router';

export const statisticsReducer = combineReducers<StatisticsState>({
    router: statisticsRouterReducer,
});
