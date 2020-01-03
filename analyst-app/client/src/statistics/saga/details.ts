import { call, getContext, put, select, spawn, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'root/app/dependencies';
import { TcpStatisticsDetailsActions, TcpStatisticsDetailsActionTypes } from 'root/statistics/actions/details';
import { TcpStatisticsDetailsSelectors } from 'root/statistics/selectors/details';

export function* tcpStatisticsDetailsSagaArray() {
    yield spawn(watchFetchTcpStatisticsSourceDetailsSaga);
}

export function* watchFetchTcpStatisticsSourceDetailsSaga() {
    yield takeLatest(TcpStatisticsDetailsActionTypes.OpenSourceDrawer, fetchTcpStatisticsSourceDetailsSaga);
}

export function* fetchTcpStatisticsSourceDetailsSaga() {
    try {
        yield put(TcpStatisticsDetailsActions.FetchSourceDetails());
        const { tcpStatisticsApi } = (yield getContext('dependencies')) as IDependencies;
        const ip = yield select(TcpStatisticsDetailsSelectors.sourceIp);
        const mac = yield select(TcpStatisticsDetailsSelectors.sourceMac);

        const details = yield call(tcpStatisticsApi.getSourceStatisticsDetails, mac, ip);

        yield put(TcpStatisticsDetailsActions.FetchSourceDetailsSucceed({ details }));
    } catch (error) {
        yield put(TcpStatisticsDetailsActions.FetchSourceDetailsFailed({ error }));
    }
}

