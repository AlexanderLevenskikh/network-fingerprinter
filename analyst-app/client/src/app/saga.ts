import { spawn } from 'redux-saga/effects';
import { streamSaga } from 'root/streams/saga';

export function* rootSaga() {
    yield spawn(streamSaga);
}
