import { call, getContext, put, spawn, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'root/app/dependencies';
import { TcpStatisticsListActions, TcpStatisticsListActionTypes } from 'root/statistics/actions/list';

export function* tcpStatisticsListSagaArray() {
    yield spawn(watchFetchTcpRequestsStatisticsListSaga);
    yield spawn(watchFetchTcpResponsesStatisticsListSaga);
}

export function* watchFetchTcpRequestsStatisticsListSaga() {
    yield takeLatest(TcpStatisticsListActionTypes.FetchRequests, fetchTcpRequestsStatisticsListSaga);
}

export function* fetchTcpRequestsStatisticsListSaga() {
    try {
        const { tcpStatisticsApi } = (yield getContext('dependencies')) as IDependencies;

        const requests = yield call(tcpStatisticsApi.getRequestStatistics);

        yield put(TcpStatisticsListActions.FetchRequestsSucceed({ requests }));
    } catch (error) {
        yield put(TcpStatisticsListActions.FetchRequestsFailed({ error }));
    }
}

export function* watchFetchTcpResponsesStatisticsListSaga() {
    yield takeLatest(TcpStatisticsListActionTypes.FetchResponses, fetchTcpResponsesStatisticsListSaga);
}

export function* fetchTcpResponsesStatisticsListSaga() {
    try {
        const { tcpStatisticsApi } = (yield getContext('dependencies')) as IDependencies;

        const responses = yield call(tcpStatisticsApi.getResponseStatistics);

        yield put(TcpStatisticsListActions.FetchResponsesSucceed({ responses }));
    } catch (error) {
        yield put(TcpStatisticsListActions.FetchResponsesFailed({ error }));
    }
}

