import { ActionType } from 'typesafe-actions';
import { StreamsRouterActions, StreamsRouterActionTypes } from 'root/streams/actions/router';
import { RouterState } from 'root/router/state';
import { RouterPages } from 'root/router/constants/pages';
import { PlayerRouterActions, PlayerRouterActionTypes } from 'root/player/actions/router';
import { StatisticsRouterActions, StatisticsRouterActionTypes } from 'root/statistics/actions/router';

const initialState: RouterState = new RouterState();
const routerActions = {
    ...StreamsRouterActions,
    ...StatisticsRouterActions,
    ...PlayerRouterActions,
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

        case StatisticsRouterActionTypes.Main: {
            return {
                ...state,
                prevPage: state.page,
                page: RouterPages.Statistics,
            };
        }

        case PlayerRouterActionTypes.Upload: {
            return {
                ...state,
                prevPage: state.page,
                page: RouterPages.Player,
            };
        }

        default:
            return state;
    }
};
