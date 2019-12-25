import { spawn, call, getContext, put, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'root/app/dependencies';
import { StreamsListActions, StreamsListActionTypes } from 'root/streams/actions/list';

export function* streamListSaga() {
    yield spawn(watchFetchStreamListSaga);
}

export function* watchFetchStreamListSaga() {
    yield takeLatest(StreamsListActionTypes.FetchList, fetchStreamListSaga);
}

export function* fetchStreamListSaga() {
    try {
        const { tcpStreamApi } = (yield getContext('dependencies')) as IDependencies;
        const streams = yield call(tcpStreamApi.getList);

        yield put(StreamsListActions.FetchListSucceed({ streams }));
    } catch (error) {
        yield put(StreamsListActions.FetchListFailed({ error }));
    }
}

