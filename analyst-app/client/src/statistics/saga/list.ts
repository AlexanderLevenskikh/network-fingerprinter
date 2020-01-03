import { spawn, call, getContext, put, takeLatest, select } from 'redux-saga/effects';
import { IDependencies } from 'root/app/dependencies';
import { StreamsListActions, StreamsListActionTypes } from 'root/streams/actions/list';
import { StreamsRouterActionTypes } from 'root/streams/actions/router';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { mapSearchParamsToDto } from 'root/streams/mappers/search/tcpSearchParams';
import { TcpStatisticsListActions, TcpStatisticsListActionTypes } from 'root/statistics/actions/list';

export function* tcpStatisticsListSagaArray() {
    yield spawn(watchFetchTcpSourcesStatisticsListSaga);
}

export function* watchFetchTcpSourcesStatisticsListSaga() {
    yield takeLatest(TcpStatisticsListActionTypes.FetchSources, fetchTcpSourcesStatisticsListSaga);
}

export function* fetchTcpSourcesStatisticsListSaga() {
    try {
        const { tcpStatisticsApi } = (yield getContext('dependencies')) as IDependencies;

        const sources = yield call(tcpStatisticsApi.getSourcesStatistics);

        yield put(TcpStatisticsListActions.FetchSourcesSucceed({ sources }));
    } catch (error) {
        yield put(TcpStatisticsListActions.FetchSourcesFailed({ error }));
    }
}

