import { spawn } from 'redux-saga/effects';
import { streamListSaga } from 'root/streams/saga/list';

export function* streamSaga() {
    yield spawn(streamListSaga);
}
