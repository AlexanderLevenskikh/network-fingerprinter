import { call, getContext, put, select, spawn, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'root/app/dependencies';
import { TcpStatisticsDetailsActions, TcpStatisticsDetailsActionTypes } from 'root/statistics/actions/details';
import { TcpStatisticsDetailsSelectors } from 'root/statistics/selectors/details';

export function* tcpStatisticsDetailsSagaArray() {
    yield spawn(watchFetchTcpStatisticsRequestDetailsSaga);
    yield spawn(watchFetchTcpStatisticsResponseDetailsSaga);
}

export function* watchFetchTcpStatisticsRequestDetailsSaga() {
    yield takeLatest(TcpStatisticsDetailsActionTypes.OpenRequestDrawer, fetchTcpStatisticsRequestDetailsSaga);
}

export function* fetchTcpStatisticsRequestDetailsSaga() {
    try {
        yield put(TcpStatisticsDetailsActions.FetchRequestDetails());
        const { tcpStatisticsApi } = (yield getContext('dependencies')) as IDependencies;
        const ip = yield select(TcpStatisticsDetailsSelectors.requestIp);
        const mac = yield select(TcpStatisticsDetailsSelectors.requestMac);

        const details = yield call(tcpStatisticsApi.getRequestStatisticsDetails, mac, ip);

        yield put(TcpStatisticsDetailsActions.FetchRequestDetailsSucceed({ details }));
    } catch (error) {
        yield put(TcpStatisticsDetailsActions.FetchRequestDetailsFailed({ error }));
    }
}

export function* watchFetchTcpStatisticsResponseDetailsSaga() {
    yield takeLatest(TcpStatisticsDetailsActionTypes.OpenResponseDrawer, fetchTcpStatisticsResponseDetailsSaga);
}

export function* fetchTcpStatisticsResponseDetailsSaga() {
    try {
        yield put(TcpStatisticsDetailsActions.FetchResponseDetails());
        const { tcpStatisticsApi } = (yield getContext('dependencies')) as IDependencies;
        const ip = yield select(TcpStatisticsDetailsSelectors.responseIp);
        const mac = yield select(TcpStatisticsDetailsSelectors.responseMac);

        const details = yield call(tcpStatisticsApi.getResponseStatisticsDetails, mac, ip);

        yield put(TcpStatisticsDetailsActions.FetchResponseDetailsSucceed({ details }));
    } catch (error) {
        yield put(TcpStatisticsDetailsActions.FetchResponseDetailsFailed({ error }));
    }
}

