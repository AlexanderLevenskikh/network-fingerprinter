import { ActionType } from 'typesafe-actions';
import { StreamRouterState } from 'root/streams/state/router';
import { StreamsRouterActions, StreamsRouterActionTypes } from 'root/streams/actions/router';
import { StreamsSearchActions, StreamsSearchActionTypes } from 'root/streams/actions/search';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { UdpStreamsSearchParamsModel } from 'root/streams/model/list/udpStreamsSearchParams';

export const initialState = new StreamRouterState();
const actions = {
    ...StreamsRouterActions,
    ...StreamsSearchActions,
};
type ReducerActions = ActionType<typeof actions>;

export const streamRouterReducer = (state = initialState, action: ReducerActions): StreamRouterState => {
    switch (action.type) {
        case StreamsRouterActionTypes.StreamsList: {
            const { query = { } } = action.meta;
            const { transport } = action.payload;
            const isTcp = transport === StreamsRouterTransport.Tcp;
            const tcpStreamsSearchParams = isTcp
                ? new TcpStreamsSearchParamsModel(query)
                : new TcpStreamsSearchParamsModel({});
            const udpStreamsSearchParams = !isTcp
                ? new UdpStreamsSearchParamsModel(query)
                : new UdpStreamsSearchParamsModel({});

            return {
                ...state,
                renderList: true,
                transport,
                tcpStreamsSearchParams,
                udpStreamsSearchParams,
            };
        }

        case StreamsSearchActionTypes.ChangeSearchParams: {
            const { model } = action.payload;
            const { transport } = state;
            const isTcp = transport === StreamsRouterTransport.Tcp;

            return {
                ...state,
                ...(isTcp ? { tcpStreamsSearchParamsDraft: new TcpStreamsSearchParamsModel(model) } : {}),
                ...(!isTcp ? { udpStreamsSearchParamsDraft: new UdpStreamsSearchParamsModel(model) } : {}),
            };
        }

        default:
            return state;
    }
};
