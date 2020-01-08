import { spawn, takeLatest, put } from 'redux-saga/effects';
import { streamSagaArray } from 'root/streams/saga';
import { tcpStatisticsSagaArray } from 'root/statistics/saga';
import { fetchCurrentUserSaga, userSagaArray } from 'root/user/saga';
import { IRegisterUserPayload, UserActionTypes } from 'root/user/actions';
import { Action, PayloadAction } from 'typesafe-actions';
import { IErrorPayload } from 'root/shared/types/actions/errorPayload';
import { notification } from 'antd';

export function* rootSaga() {
    yield spawn(streamSagaArray);
    yield spawn(tcpStatisticsSagaArray);
    yield spawn(userSagaArray);
    yield spawn(watchFetchCurrentUserSaga);
}

export function* watchFetchCurrentUserSaga() {
    yield takeLatest((action: any) => /^.*\/fail(ed)?$/.test(action.type), errorHandlingSaga);
}

const openNotification = (message: string, description?: string) => {
    notification.open({
        message,
        description,
        onClick: () => {},
    });
};

export function* errorHandlingSaga(action: PayloadAction<string, IErrorPayload>) {
    const { error, hideModal } = action.payload;
    if (!hideModal) {
        // @ts-ignore
        if (error.title) {
            openNotification(
                // @ts-ignore
                error.title,
                error.message,
            );
        }
    }
}
