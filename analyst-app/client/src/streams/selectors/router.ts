import { IState } from 'root/app/state';

export class StreamRouterSelectors {
    static renderList = (state: IState) => StreamRouterSelectors.selectSlice(state).renderList;
    static transport = (state: IState) => StreamRouterSelectors.selectSlice(state).transport;

    static tcpStreamsSearchOpened = (state: IState) => StreamRouterSelectors.selectSlice(state).tcpStreamsSearchOpened;
    static tcpStreamsSearchParamsAreEmpty = (state: IState) => StreamRouterSelectors.selectSlice(state).tcpStreamsSearchParamsAreEmpty;
    static tcpStreamsSearchParams = (state: IState) => StreamRouterSelectors.selectSlice(state).tcpStreamsSearchParams;
    static tcpStreamsSearchParamsDraft = (state: IState) => StreamRouterSelectors.selectSlice(state).tcpStreamsSearchParamsDraft;

    static udpStreamsSearchOpened = (state: IState) => StreamRouterSelectors.selectSlice(state).udpStreamsSearchOpened;
    static udpStreamsSearchParamsAreEmpty = (state: IState) => StreamRouterSelectors.selectSlice(state).udpStreamsSearchParamsAreEmpty;
    static udpStreamsSearchParams = (state: IState) => StreamRouterSelectors.selectSlice(state).udpStreamsSearchParams;
    static udpStreamsSearchParamsDraft = (state: IState) => StreamRouterSelectors.selectSlice(state).udpStreamsSearchParamsDraft;

    private static selectSlice = (state: IState) => state.stream.router;
}
