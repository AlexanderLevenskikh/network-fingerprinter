import { ActionType } from 'typesafe-actions';
import { StreamsSearchActionTypes } from 'root/streams/actions/search';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { UdpStreamsSearchParamsModel } from 'root/streams/model/list/udpStreamsSearchParams';
import { areQueryParamsEmpty } from 'root/shared/utils/areQueryParamsEmpty';
import { StatisticsRouterActions, StatisticsRouterActionTypes } from 'root/statistics/actions/router';
import { TcpStatisticsRouterState } from 'root/statistics/state/router';

export const initialState = new TcpStatisticsRouterState();
type ReducerActions = ActionType<typeof StatisticsRouterActions>;

export const tcpStatisticsRouterReducer = (state = initialState, action: ReducerActions): TcpStatisticsRouterState => {
    switch (action.type) {
        case StatisticsRouterActionTypes.Main: {
            const { tabName } = action.payload;

            return {
                ...state,
                tabName,
            };
        }

        default:
            return state;
    }
};
