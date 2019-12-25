import { ActionType } from 'typesafe-actions';
import { StreamsRouterActions, StreamsRouterActionTypes } from 'root/streams/actions/router';
import { RouterState } from 'root/router/state';
import { RouterPages } from 'root/router/constants/pages';

const initialState: RouterState = new RouterState();
const routerActions = {
    ...StreamsRouterActions,
};
type ReducerActions = ActionType<typeof routerActions>;

export const routerReducer = (state = initialState, action: ReducerActions): RouterState => {
    switch (action.type) {
        case StreamsRouterActionTypes.StreamsList: {
            return {
                ...state,
                prevPage: state.page,
                page: RouterPages.Streams,
            };
        }

        default:
            return state;
    }
};
