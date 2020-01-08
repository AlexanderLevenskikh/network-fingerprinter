import { createAction as csa } from 'typesafe-actions';
import { IErrorPayload } from 'root/shared/types/actions/errorPayload';
import { IUserView } from 'DAL/User/IUserView';

interface IFetchCurrentUserSucceedPayload {
    user: IUserView;
}

export enum UserActionTypes {
    FetchCurrentUser = 'users/current/fetch',
    FetchCurrentUserSucceed = 'users/current/fetch/succeed',
    FetchCurrentUserFailed = 'users/current/fetch/failed',
    Logout = 'users/logout',
}

export const UserActions = {
    FetchCurrentUser: csa(UserActionTypes.FetchCurrentUser)(),
    FetchCurrentUserSucceed: csa(UserActionTypes.FetchCurrentUserSucceed)<IFetchCurrentUserSucceedPayload>(),
    FetchCurrentUserFailed: csa(UserActionTypes.FetchCurrentUserFailed)<IErrorPayload>(),
    Logout: csa(UserActionTypes.Logout)(),
};
