import { put, select, spawn, takeLatest } from 'redux-saga/effects';
import { StreamsSearchActionTypes } from 'root/streams/actions/search';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { filterQuery } from 'root/shared/utils/filterQuery';
import { areQueryParamsEqual } from 'root/shared/utils/areQueryParamsEqual';
import { StreamsRouterActions } from 'root/streams/actions/router';

export function* streamSearchingSagaArray() {
    yield spawn(watchSearchStreamSaga);
}

export function* watchSearchStreamSaga() {
    yield takeLatest(StreamsSearchActionTypes.Search, searchStreamSaga);
}

export function* searchStreamSaga(action: any) {
    const { model: searchParamsDraft } = action.payload;
    const transport = yield select(StreamRouterSelectors.transport);
    const isTcp = transport === StreamsRouterTransport.Tcp;
    const searchParams = yield select(
        isTcp
        ? StreamRouterSelectors.tcpStreamsSearchParamsDraft
        : StreamRouterSelectors.udpStreamsSearchParamsDraft
    );

    const filteredSearchParamsDraft = filterQuery(searchParamsDraft);
    const filteredSearchParams = filterQuery(searchParams);
    const areSearchParamsWereChanged = !areQueryParamsEqual(filteredSearchParams, filteredSearchParamsDraft);

    if (areSearchParamsWereChanged) {
        put(StreamsRouterActions.streamsList(
            {
                transport,
            },
            {
                query: {
                    ...filteredSearchParamsDraft,
                    current: 1,
                },
            },
        ));
    }
}

