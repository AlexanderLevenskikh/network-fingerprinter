import { ActionType } from 'typesafe-actions';
import { TcpStatisticsListActions, TcpStatisticsListActionTypes } from 'root/statistics/actions/list';
import { TcpStatisticsListState } from 'root/statistics/state/list';

export const initialState = new TcpStatisticsListState();
type ReducerActions = ActionType<typeof TcpStatisticsListActions>;

export const tcpStatisticsListReducer = (state = initialState, action: ReducerActions): TcpStatisticsListState => {
    switch (action.type) {
        case TcpStatisticsListActionTypes.FetchSources: {
            return {
                ...state,
                sourcesLoading: true,
            };
        }
        case TcpStatisticsListActionTypes.FetchSourcesSucceed: {
            const { sources } = action.payload;

            return {
                ...state,
                sourcesLoading: false,
                sources,
            }
        }

        case TcpStatisticsListActionTypes.FetchSourcesFailed:  {
            return {
                ...state,
                sourcesLoading: false,
            }
        }

        case TcpStatisticsListActionTypes.FetchDestinations: {
            return {
                ...state,
                destinationsLoading: true,
            };
        }
        case TcpStatisticsListActionTypes.FetchDestinationsSucceed: {
            const { destinations } = action.payload;

            return {
                ...state,
                destinationsLoading: false,
                destinations,
            }
        }

        case TcpStatisticsListActionTypes.FetchDestinationsFailed:  {
            return {
                ...state,
                destinationsLoading: false,
            }
        }

        default:
            return state;
    }
};
