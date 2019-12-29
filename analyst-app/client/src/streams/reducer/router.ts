import { ActionType } from 'typesafe-actions';
import { StreamRouterState } from 'root/streams/state/router';
import { StreamsRouterActions, StreamsRouterActionTypes } from 'root/streams/actions/router';
import { StreamsSearchActions, StreamsSearchActionTypes } from 'root/streams/actions/search';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { UdpStreamsSearchParamsModel } from 'root/streams/model/list/udpStreamsSearchParams';
import { areQueryParamsEmpty } from 'root/shared/utils/areQueryParamsEmpty';

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
            const isUdp = transport === StreamsRouterTransport.Udp;

            const tcpStreamsSearchParams = new TcpStreamsSearchParamsModel(
                isTcp ? query : {},
            );
            const tcpStreamsSearchParamsAreEmpty = areQueryParamsEmpty(tcpStreamsSearchParams);
            const udpStreamsSearchParams = new UdpStreamsSearchParamsModel(
                isUdp ? query : {},
            );
            const udpStreamsSearchParamsAreEmpty = areQueryParamsEmpty(udpStreamsSearchParams);

            return {
                ...state,
                renderList: true,
                transport,
                tcpStreamsSearchParams,
                tcpStreamsSearchParamsAreEmpty,
                udpStreamsSearchParams,
                udpStreamsSearchParamsAreEmpty,
            };
        }

        case StreamsSearchActionTypes.Open: {
            const { tcpStreamsSearchParams, udpStreamsSearchParams, transport } = state;
            const isTcp = transport === StreamsRouterTransport.Tcp;
            const isUdp = transport === StreamsRouterTransport.Udp;

            return {
                ...state,
                ...(isTcp ? {
                    tcpStreamsSearchOpened: true,
                    tcpStreamsSearchParamsDraft: new TcpStreamsSearchParamsModel(tcpStreamsSearchParams)
                } : {}),
                ...(isUdp ? {
                    udpStreamsSearchOpened: true,
                    udpStreamsSearchParamsDraft: new UdpStreamsSearchParamsModel(udpStreamsSearchParams)
                } : {}),
            };
        }

        case StreamsSearchActionTypes.Close: {
            const { transport } = state;
            const isTcp = transport === StreamsRouterTransport.Tcp;
            const isUdp = transport === StreamsRouterTransport.Udp;

            return {
                ...state,
                ...(isTcp ? { tcpStreamsSearchOpened: false } : {}),
                ...(isUdp ? { udpStreamsSearchOpened: false } : {}),
            };
        }

        case StreamsSearchActionTypes.ChangeSearchParams: {
            const { model } = action.payload;
            const { transport } = state;
            const isTcp = transport === StreamsRouterTransport.Tcp;
            const isUdp = transport === StreamsRouterTransport.Udp;

            return {
                ...state,
                ...(isTcp ? { tcpStreamsSearchParamsDraft: new TcpStreamsSearchParamsModel(model) } : {}),
                ...(isUdp ? { udpStreamsSearchParamsDraft: new UdpStreamsSearchParamsModel(model) } : {}),
            };
        }

        default:
            return state;
    }
};
