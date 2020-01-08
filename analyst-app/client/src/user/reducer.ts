import { ActionType } from 'typesafe-actions';
import { UserState } from 'root/user/state';
import { UserActions, UserActionTypes } from 'root/user/actions';

export const initialState = new UserState();
type ReducerActions = ActionType<typeof UserActions>;

export const userReducer = (state = initialState, action: ReducerActions): UserState => {
    switch (action.type) {
        case UserActionTypes.FetchCurrentUser: {
            return {
                ...state,
                userLoading: true,
            };
        }
        case UserActionTypes.FetchCurrentUserSucceed: {
            const { user } = action.payload;

            return {
                ...state,
                userLoading: false,
                user,
            }
        }

        case UserActionTypes.FetchCurrentUserFailed:  {
            return {
                ...state,
                userLoading: false,
            }
        }

        case UserActionTypes.OpenUsersListModal: {
            return {
                ...state,
                usesListModalOpened: true,
            };
        }

        case UserActionTypes.CloseUsersListModal: {
            return {
                ...state,
                usesListModalOpened: false,
            };
        }

        case UserActionTypes.FetchUsersList: {
            return {
                ...state,
                usersListLoading: true,
            };
        }
        case UserActionTypes.FetchUsersListSucceed: {
            const { users } = action.payload;

            return {
                ...state,
                usersListLoading: false,
                usersList: users,
            }
        }

        case UserActionTypes.FetchUsersListFailed:  {
            return {
                ...state,
                usersListLoading: false,
            }
        }

        case UserActionTypes.OpenUserRegistrationModal: {
            return {
                ...state,
                registrationModalOpened: true,
            };
        }

        case UserActionTypes.CloseUserRegistrationModal: {
            return {
                ...state,
                registrationModalOpened: false,
            };
        }

        case UserActionTypes.RegisterUser: {
            return {
                ...state,
                registrationLoading: true,
                registrationLoadError: false,
            };
        }

        case UserActionTypes.RegisterUserSucceed: {
            return {
                ...state,
                registrationLoading: false,
            }
        }

        case UserActionTypes.RegisterUserFailed:  {
            return {
                ...state,
                registrationLoading: false,
                registrationLoadError: true,
            }
        }

        default:
            return state;
    }
};
