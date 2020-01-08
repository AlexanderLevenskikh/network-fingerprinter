import { call, getContext, put, spawn, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'root/app/dependencies';
import { IRegisterUserPayload, IRemoveUserPayload, UserActions, UserActionTypes } from 'root/user/actions';
import { PayloadAction } from 'typesafe-actions';
import { mapUserRegistrationModelToEvent } from 'root/user/mappers/modelToRegistrationEvent';
import { message } from 'antd';

export function* userSagaArray() {
    yield spawn(watchFetchCurrentUserSaga);
    yield spawn(watchOpenUsersListModalSaga);
    yield spawn(watchFetchUsersListSaga);
    yield spawn(watchUserLogoutSaga);
    yield spawn(watchUserRemoveSaga);
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


export function* watchOpenUsersListModalSaga() {
    yield takeLatest(UserActionTypes.OpenUsersListModal, openUsersListModalSaga);
}
export function* openUsersListModalSaga() {
    yield put(UserActions.FetchUsersList());
}

export function* watchFetchUsersListSaga() {
    yield takeLatest(UserActionTypes.FetchUsersList, fetchUsersListSaga);
}
export function* fetchUsersListSaga() {
    try {
        const { userApi } = (yield getContext('dependencies')) as IDependencies;
        const users = yield call(userApi.getUsersList);

        yield put(UserActions.FetchUsersListSucceed({ users }));
    } catch (error) {
        yield put(UserActions.FetchUsersListFailed({ error }));
    }
}

export function* watchUserRemoveSaga() {
    yield takeLatest(UserActionTypes.RemoveUser, userRemoveSaga);
}
export function* userRemoveSaga(action: PayloadAction<string, IRemoveUserPayload>) {
    const { userApi } = (yield getContext('dependencies')) as IDependencies;
    yield call(userApi.remove, action.payload.userId);
    yield put(UserActions.FetchUsersList());
}

export function* watchUserLogoutSaga() {
    yield takeLatest(UserActionTypes.Logout, userLogoutSaga);
}
export function* userLogoutSaga() {
    const { userApi } = (yield getContext('dependencies')) as IDependencies;
    yield call(userApi.logout);
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
        yield put(UserActions.CloseUserRegistrationModal());
    } catch (error) {
        yield put(UserActions.RegisterUserFailed({ error }));
    }

}
