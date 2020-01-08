import { combineReducers } from 'redux';
import { IState } from 'root/app/state';
import { routerReducer } from 'root/router/reducer';
import { locationReducer } from 'root/app/router';
import { streamReducer } from 'root/streams/reducer';
import { tcpStatisticsReducer } from 'root/statistics/reducer';
import { userReducer } from 'root/user/reducer';

export const reducer = combineReducers<IState>({
    stream: streamReducer,
    statistics: tcpStatisticsReducer,
    user: userReducer,
    router: routerReducer,
    location: locationReducer,
});
