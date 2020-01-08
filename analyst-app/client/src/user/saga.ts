import { call, getContext, put, spawn, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'root/app/dependencies';
import { IRegisterUserPayload, UserActions, UserActionTypes } from 'root/user/actions';
import { PayloadAction } from 'typesafe-actions';
import { mapUserRegistrationModelToEvent } from 'root/user/mappers/modelToRegistrationEvent';
import { message, notification } from 'antd';

export function* userSagaArray() {
    yield spawn(watchFetchCurrentUserSaga);
    yield spawn(watchUserLogoutSaga);
    yield spawn(watchUserRegistrationSaga);
}

export function* watchFetchCurrentUserSaga() {
    yield takeLatest(UserActionTypes.FetchCurrentUser, fetchCurrentUserSaga);
}
export function* fetchCurrentUserSaga() {
    try {
        const { userApi } = (yield getContext('dependencies')) as IDependencies;
        const user = yield call(userApi.getCurrentUser);

        yield put(UserActions.FetchCurrentUserSucceed({ user }));
    } catch (error) {
        yield put(UserActions.FetchCurrentUserFailed({ error }));
    }
}

export function* watchUserLogoutSaga() {
    yield takeLatest(UserActionTypes.Logout, userLogoutSaga);
}
export function* userLogoutSaga() {
    const { userApi } = (yield getContext('dependencies')) as IDependencies;
    const user = yield call(userApi.logout);
}

export function* watchUserRegistrationSaga() {
    yield takeLatest(UserActionTypes.RegisterUser, userRegistrationSaga);
}
export function* userRegistrationSaga(action: PayloadAction<string, IRegisterUserPayload>) {
    try {
        const { payload: { model } } = action;

        const { userApi } = (yield getContext('dependencies')) as IDependencies;
        const event = mapUserRegistrationModelToEvent(model);
        yield call(userApi.register, event);

        message.success('User successfully registered', 5);
        yield put(UserActions.RegisterUserSucceed());
    } catch (error) {
        yield put(UserActions.RegisterUserFailed({ error }));
    }

}
