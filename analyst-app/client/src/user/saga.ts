import { call, getContext, put, spawn, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'root/app/dependencies';
import { UserActions, UserActionTypes } from 'root/user/actions';

export function* userSagaArray() {
    yield spawn(watchFetchCurrentUserSaga);
    yield spawn(watchUserLogoutSaga);
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
