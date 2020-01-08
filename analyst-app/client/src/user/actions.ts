import { createAction as csa } from 'typesafe-actions';
import { IErrorPayload } from 'root/shared/types/actions/errorPayload';
import { IUserView } from 'DAL/User/IUserView';
import { IUserRegistrationModel } from 'root/user/model/registration';

interface IFetchCurrentUserSucceedPayload {
    user: IUserView;
}

interface IFetchUsersListSucceedPayload {
    users: IUserView[];
}

export interface IRemoveUserPayload {
    userId: string;
}

export interface IRegisterUserPayload {
    model: IUserRegistrationModel;
}

export enum UserActionTypes {
    FetchCurrentUser = 'users/current/fetch',
    FetchCurrentUserSucceed = 'users/current/fetch/succeed',
    FetchCurrentUserFailed = 'users/current/fetch/failed',
    OpenUsersListModal = 'users/list/modal/open',
    CloseUsersListModal = 'users/list/modal/close',
    RemoveUser = 'users/remove',
    FetchUsersList = 'users/list/fetch',
    FetchUsersListSucceed = 'users/list/fetch/succeed',
    FetchUsersListFailed = 'users/list/fetch/failed',
    OpenUserRegistrationModal = 'users/registration/modal/open',
    CloseUserRegistrationModal = 'users/registration/modal/close',
    RegisterUser = 'users/registration',
    RegisterUserSucceed = 'users/registration/succeed',
    RegisterUserFailed = 'users/registration/failed',
    Logout = 'users/logout',
}

export const UserActions = {
    FetchCurrentUser: csa(UserActionTypes.FetchCurrentUser)(),
    FetchCurrentUserSucceed: csa(UserActionTypes.FetchCurrentUserSucceed)<IFetchCurrentUserSucceedPayload>(),
    FetchCurrentUserFailed: csa(UserActionTypes.FetchCurrentUserFailed)<IErrorPayload>(),
    OpenUsersListModal: csa(UserActionTypes.OpenUsersListModal)(),
    CloseUsersListModal: csa(UserActionTypes.CloseUsersListModal)(),
    RemoveUser: csa(UserActionTypes.RemoveUser)<IRemoveUserPayload>(),
    FetchUsersList: csa(UserActionTypes.FetchUsersList)(),
    FetchUsersListSucceed: csa(UserActionTypes.FetchUsersListSucceed)<IFetchUsersListSucceedPayload>(),
    FetchUsersListFailed: csa(UserActionTypes.FetchUsersListFailed)<IErrorPayload>(),
    OpenUserRegistrationModal: csa(UserActionTypes.OpenUserRegistrationModal)(),
    CloseUserRegistrationModal: csa(UserActionTypes.CloseUserRegistrationModal)(),
    RegisterUser: csa(UserActionTypes.RegisterUser)<IRegisterUserPayload>(),
    RegisterUserSucceed: csa(UserActionTypes.RegisterUserSucceed)(),
    RegisterUserFailed: csa(UserActionTypes.RegisterUserFailed)<IErrorPayload>(),
    Logout: csa(UserActionTypes.Logout)(),
};
