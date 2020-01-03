import { ActionType } from 'typesafe-actions';
import { TcpStatisticsDetailsActions, TcpStatisticsDetailsActionTypes } from 'root/statistics/actions/details';
import { TcpStatisticsDetailsState } from 'root/statistics/state/details';

export const initialState = new TcpStatisticsDetailsState();
type ReducerActions = ActionType<typeof TcpStatisticsDetailsActions>;

export const tcpStatisticsDetailsReducer = (state = initialState, action: ReducerActions): TcpStatisticsDetailsState => {
    switch (action.type) {
        case TcpStatisticsDetailsActionTypes.OpenSourceDrawer: {
            const { ip, mac } = action.payload;

            return {
                ...state,
                sourceDrawerOpened: true,
                sourceIp: ip,
                sourceMac: mac,
            };
        }

        case TcpStatisticsDetailsActionTypes.CloseSourceDrawer: {
            return {
                ...state,
                sourceDrawerOpened: false,
            };
        }

        case TcpStatisticsDetailsActionTypes.FetchSourceDetails: {
            return {
                ...state,
                sourceDetailsLoading: true,
            };
        }
        case TcpStatisticsDetailsActionTypes.FetchSourceDetailsSucceed: {
            const { details } = action.payload;

            return {
                ...state,
                sourceDetailsLoading: false,
                sourceDetails: details,
            }
        }

        case TcpStatisticsDetailsActionTypes.FetchSourceDetailsFailed:  {
            return {
                ...state,
                sourceDetailsLoading: false,
            }
        }

        case TcpStatisticsDetailsActionTypes.OpenDestinationDrawer: {
            const { ip } = action.payload;

            return {
                ...state,
                destinationDrawerOpened: true,
                destinationIp: ip,
            };
        }

        case TcpStatisticsDetailsActionTypes.CloseDestinationDrawer: {
            return {
                ...state,
                destinationDrawerOpened: false,
            };
        }

        case TcpStatisticsDetailsActionTypes.FetchDestinationDetails: {
            return {
                ...state,
                destinationDetailsLoading: true,
            };
        }
        case TcpStatisticsDetailsActionTypes.FetchDestinationDetailsSucceed: {
            const { details } = action.payload;

            return {
                ...state,
                destinationDetailsLoading: false,
                destinationDetails: details,
            }
        }

        case TcpStatisticsDetailsActionTypes.FetchDestinationDetailsFailed:  {
            return {
                ...state,
                destinationDetailsLoading: false,
            }
        }

        default:
            return state;
    }
};
