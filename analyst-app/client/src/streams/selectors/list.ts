import { IState } from 'root/app/state';

export class StreamListSelectors {
    static list = (state: IState) => StreamListSelectors.selectSlice(state).streams;
    static total = (state: IState) => StreamListSelectors.selectSlice(state).streamsTotal;
    static loading = (state: IState) => StreamListSelectors.selectSlice(state).streamsLoading;

    private static selectSlice = (state: IState) => state.stream.list;
}
