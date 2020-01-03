import { ActionType } from 'typesafe-actions';
import { TcpStatisticsDetailsActions, TcpStatisticsDetailsActionTypes } from 'root/statistics/actions/details';
import { TcpStatisticsDetailsState } from 'root/statistics/state/details';

export const initialState = new TcpStatisticsDetailsState();
type ReducerActions = ActionType<typeof TcpStatisticsDetailsActions>;

export const tcpStatisticsDetailsReducer = (state = initialState, action: ReducerActions): TcpStatisticsDetailsState => {
    switch (action.type) {
        case TcpStatisticsDetailsActionTypes.OpenRequestDrawer: {
            const { ip, mac } = action.payload;

            return {
                ...state,
                requestDrawerOpened: true,
                requestIp: ip,
                requestMac: mac,
            };
        }

        case TcpStatisticsDetailsActionTypes.CloseRequestDrawer: {
            return {
                ...state,
                requestDrawerOpened: false,
            };
        }

        case TcpStatisticsDetailsActionTypes.FetchRequestDetails: {
            return {
                ...state,
                requestDetailsLoading: true,
            };
        }
        case TcpStatisticsDetailsActionTypes.FetchRequestDetailsSucceed: {
            const { details } = action.payload;

            return {
                ...state,
                requestDetailsLoading: false,
                requestDetails: details,
            }
        }

        case TcpStatisticsDetailsActionTypes.FetchRequestDetailsFailed:  {
            return {
                ...state,
                requestDetailsLoading: false,
            }
        }

        case TcpStatisticsDetailsActionTypes.OpenResponseDrawer: {
            const { ip, mac } = action.payload;

            return {
                ...state,
                responseDrawerOpened: true,
                responseIp: ip,
                responseMac: mac,
            };
        }

        case TcpStatisticsDetailsActionTypes.CloseResponseDrawer: {
            return {
                ...state,
                responseDrawerOpened: false,
            };
        }

        case TcpStatisticsDetailsActionTypes.FetchResponseDetails: {
            return {
                ...state,
                responseDetailsLoading: true,
            };
        }
        case TcpStatisticsDetailsActionTypes.FetchResponseDetailsSucceed: {
            const { details } = action.payload;

            return {
                ...state,
                responseDetailsLoading: false,
                responseDetails: details,
            }
        }

        case TcpStatisticsDetailsActionTypes.FetchResponseDetailsFailed:  {
            return {
                ...state,
                responseDetailsLoading: false,
            }
        }

        default:
            return state;
    }
};
