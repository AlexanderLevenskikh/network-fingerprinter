import { ActionType } from 'typesafe-actions';
import { TcpStatisticsListActions, TcpStatisticsListActionTypes } from 'root/statistics/actions/list';
import { TcpStatisticsListState } from 'root/statistics/state/list';

export const initialState = new TcpStatisticsListState();
type ReducerActions = ActionType<typeof TcpStatisticsListActions>;

export const tcpStatisticsListReducer = (state = initialState, action: ReducerActions): TcpStatisticsListState => {
    switch (action.type) {
        case TcpStatisticsListActionTypes.FetchRequests: {
            return {
                ...state,
                requestsLoading: true,
            };
        }
        case TcpStatisticsListActionTypes.FetchRequestsSucceed: {
            const { requests } = action.payload;

            return {
                ...state,
                requestsLoading: false,
                requests,
            }
        }

        case TcpStatisticsListActionTypes.FetchRequestsFailed:  {
            return {
                ...state,
                requestsLoading: false,
            }
        }

        case TcpStatisticsListActionTypes.FetchResponses: {
            return {
                ...state,
                responsesLoading: true,
            };
        }
        case TcpStatisticsListActionTypes.FetchResponsesSucceed: {
            const { responses } = action.payload;

            return {
                ...state,
                responsesLoading: false,
                responses,
            }
        }

        case TcpStatisticsListActionTypes.FetchResponsesFailed:  {
            return {
                ...state,
                responsesLoading: false,
            }
        }

        default:
            return state;
    }
};
