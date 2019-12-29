import { createAction as csa } from 'typesafe-actions';
import { IErrorPayload } from 'root/shared/types/actions/errorPayload';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';

interface IFetchListSucceedPayload {
    streams: ITcpStreamView[];
    streamsTotal: number;
}

export enum StreamsListActionTypes {
    FetchList = 'streams/list/fetch',
    FetchListSucceed = 'streams/list/fetch/succeed',
    FetchListFailed = 'streams/list/fetch/failed',
}

export const StreamsListActions = {
    FetchList: csa(StreamsListActionTypes.FetchList)(),
    FetchListSucceed: csa(StreamsListActionTypes.FetchListSucceed)<IFetchListSucceedPayload>(),
    FetchListFailed: csa(StreamsListActionTypes.FetchListFailed)<IErrorPayload>(),
};
