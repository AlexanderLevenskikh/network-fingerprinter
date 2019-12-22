import { combineReducers } from 'redux';
import { IState } from 'root/app/state';
import { routerReducer } from 'root/router/reducer';
import { locationReducer } from 'root/app/router';

export const reducer = combineReducers<IState>({
    router: routerReducer,
    location: locationReducer,
});
