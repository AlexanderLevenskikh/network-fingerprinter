import { put, select, spawn, takeLatest } from 'redux-saga/effects';
import { StreamsSearchActionTypes } from 'root/streams/actions/search';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { filterQuery } from 'root/shared/utils/filterQuery';
import { areQueryParamsEqual } from 'root/shared/utils/areQueryParamsEqual';
import { StreamsRouterActions } from 'root/streams/actions/router';
import { SearchParamsModel } from 'root/shared/model/searchParams';

export function* streamSearchingSagaArray() {
    yield spawn(watchSearchStreamSaga);
    yield spawn(watchCloseSearchStreamSaga);
}

export function* watchSearchStreamSaga() {
    yield takeLatest(StreamsSearchActionTypes.Search, searchStreamSaga);
}

export function* searchStreamSaga() {
    const transport = yield select(StreamRouterSelectors.transport);
    const isTcp = transport === StreamsRouterTransport.Tcp;
    const searchParamsDraft = yield select(
        isTcp
            ? StreamRouterSelectors.tcpStreamsSearchParamsDraft
            : StreamRouterSelectors.udpStreamsSearchParamsDraft
    );
    const searchParams = yield select(
        isTcp
        ? StreamRouterSelectors.tcpStreamsSearchParams
        : StreamRouterSelectors.udpStreamsSearchParams
    );

    const filteredSearchParamsDraft = filterQuery(searchParamsDraft);
    const filteredSearchParams = filterQuery(searchParams);
    const areSearchParamsWereChanged = !areQueryParamsEqual(filteredSearchParams, filteredSearchParamsDraft);


    if (areSearchParamsWereChanged) {
        yield put(StreamsRouterActions.streamsList(
            { transport },
            {
                query: {
                    ...filteredSearchParamsDraft,
                    current: 1,
                },
            },
        ));
    }
}

export function* watchCloseSearchStreamSaga() {
    yield takeLatest(StreamsSearchActionTypes.Close, searchCloseStreamSaga);
}

export function* searchCloseStreamSaga() {
    const transport = yield select(StreamRouterSelectors.transport);
    const isTcp = transport === StreamsRouterTransport.Tcp;
    const searchParams = yield select(
        isTcp
            ? StreamRouterSelectors.tcpStreamsSearchParamsDraft
            : StreamRouterSelectors.udpStreamsSearchParamsDraft
    );
    const { current, take } = searchParams;

    const defaultParamsWithCurrentSkipAndTake = new SearchParamsModel(current, take);
    const queryWasChangedFromDefault = !areQueryParamsEqual(searchParams, defaultParamsWithCurrentSkipAndTake);

    if (queryWasChangedFromDefault) {
        const query = {
            take,
            current: 1,
        };

        yield put(StreamsRouterActions.streamsList(
            { transport },
            { query },
        ));
    }
}
