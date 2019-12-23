import { combineReducers } from 'redux';
import { StreamState } from 'root/streams/state';
import { streamListReducer } from 'root/streams/reducer/list';

export const streamReducer = combineReducers<StreamState>({
    list: streamListReducer,
});
