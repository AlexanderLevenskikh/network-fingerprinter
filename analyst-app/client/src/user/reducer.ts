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

        default:
            return state;
    }
};
