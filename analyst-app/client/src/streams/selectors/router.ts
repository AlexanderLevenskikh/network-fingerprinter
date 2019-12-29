import { IState } from 'root/app/state';

export class StreamRouterSelectors {
    static renderList = (state: IState) => StreamRouterSelectors.selectSlice(state).renderList;
    static transport = (state: IState) => StreamRouterSelectors.selectSlice(state).transport;
    static tcpStreamsSearchParams = (state: IState) => StreamRouterSelectors.selectSlice(state).tcpStreamsSearchParams;
    static tcpStreamsSearchParamsDraft = (state: IState) => StreamRouterSelectors.selectSlice(state).tcpStreamsSearchParamsDraft;
    static udpStreamsSearchParams = (state: IState) => StreamRouterSelectors.selectSlice(state).udpStreamsSearchParams;
    static udpStreamsSearchParamsDraft = (state: IState) => StreamRouterSelectors.selectSlice(state).udpStreamsSearchParamsDraft;

    private static selectSlice = (state: IState) => state.stream.router;
}
