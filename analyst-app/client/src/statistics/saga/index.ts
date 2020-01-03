import { spawn } from 'redux-saga/effects';
import { tcpStatisticsListSagaArray } from 'root/statistics/saga/list';

export function* tcpStatisticsSagaArray() {
    yield spawn(tcpStatisticsListSagaArray);
}
