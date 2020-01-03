import { spawn } from 'redux-saga/effects';
import { tcpStatisticsListSagaArray } from 'root/statistics/saga/list';
import { tcpStatisticsDetailsSagaArray } from 'root/statistics/saga/details';

export function* tcpStatisticsSagaArray() {
    yield spawn(tcpStatisticsListSagaArray);
    yield spawn(tcpStatisticsDetailsSagaArray);
}
