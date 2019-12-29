import { combineReducers } from 'redux';
import { StreamState } from 'root/streams/state';
import { streamListReducer } from 'root/streams/reducer/list';
import { streamRouterReducer } from 'root/streams/reducer/router';

export const streamReducer = combineReducers<StreamState>({
    list: streamListReducer,
    router: streamRouterReducer,
});
