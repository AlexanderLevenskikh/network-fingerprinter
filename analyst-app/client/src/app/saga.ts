import { spawn } from 'redux-saga/effects';
import { streamSagaArray } from 'root/streams/saga';
import { tcpStatisticsSagaArray } from 'root/statistics/saga';

export function* rootSaga() {
    yield spawn(streamSagaArray);
    yield spawn(tcpStatisticsSagaArray);
}
