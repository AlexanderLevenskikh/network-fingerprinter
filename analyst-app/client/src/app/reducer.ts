import { combineReducers } from 'redux';
import { IState } from 'root/app/state';
import { routerReducer } from 'root/router/reducer';
import { locationReducer } from 'root/app/router';
import { streamReducer } from 'root/streams/reducer';
import { statisticsReducer } from 'root/statistics/reducer';

export const reducer = combineReducers<IState>({
    stream: streamReducer,
    statistics: statisticsReducer,
    router: routerReducer,
    location: locationReducer,
});
