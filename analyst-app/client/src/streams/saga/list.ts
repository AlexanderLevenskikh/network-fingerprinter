import { spawn, call, getContext, put, takeLatest, select } from 'redux-saga/effects';
import { IDependencies } from 'root/app/dependencies';
import { StreamsListActions, StreamsListActionTypes } from 'root/streams/actions/list';
import { StreamsRouterActionTypes } from 'root/streams/actions/router';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { mapSearchParamsToDto } from 'root/streams/mappers/search/tcpSearchParams';
import { StreamsSearchActions } from 'root/streams/actions/search';

export function* streamListSagaArray() {
    yield spawn(watchStreamListSaga);
    yield spawn(watchFetchStreamListSaga);
}

export function* watchStreamListSaga() {
    yield takeLatest(StreamsRouterActionTypes.StreamsList, streamListSaga);
}
export function* streamListSaga() {
    yield put(StreamsListActions.FetchList());
}

export function* watchFetchStreamListSaga() {
    yield takeLatest(StreamsListActionTypes.FetchList, fetchStreamListSaga);
}
export function* fetchStreamListSaga() {
    try {
        const { tcpStreamApi } = (yield getContext('dependencies')) as IDependencies;
        const transport = yield select(StreamRouterSelectors.transport);
        const isTcp = transport === StreamsRouterTransport.Tcp;
        const tcpStreamsSearchParams = yield select(StreamRouterSelectors.tcpStreamsSearchParams);
        const udpStreamsSearchParams = yield select(StreamRouterSelectors.udpStreamsSearchParams);
        const searchParams = isTcp ? tcpStreamsSearchParams : udpStreamsSearchParams;
        const mappedSearchParams = mapSearchParamsToDto(searchParams);

        const streams = yield call(tcpStreamApi.getTcpStreamList, mappedSearchParams);
        const streamsTotal = yield call(tcpStreamApi.getTcpStreamListTotal, mappedSearchParams);

        yield put(StreamsListActions.FetchListSucceed({
            streams,
            streamsTotal,
        }));
    } catch (error) {
        yield put(StreamsListActions.FetchListFailed({ error }));
    }
}

