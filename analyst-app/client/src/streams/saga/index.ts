import { spawn } from 'redux-saga/effects';
import { streamListSagaArray } from 'root/streams/saga/list';
import { streamSearchingSagaArray } from 'root/streams/saga/search';

export function* streamSaga() {
    yield spawn(streamListSagaArray);
    yield spawn(streamSearchingSagaArray);
}
