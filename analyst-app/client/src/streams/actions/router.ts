import { createAction as csa } from 'typesafe-actions';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { SearchParamsModel } from 'root/shared/model/searchParams';

export interface IStreamListRouterActionPayload {
    transport: StreamsRouterTransport;
}

export interface IStreamListRouterActionMeta {
    query: SearchParamsModel;
}

export enum StreamsRouterActionTypes {
    StreamsList = 'streams/router/list',
}

export const StreamsRouterActions = {
    streamsList: csa(StreamsRouterActionTypes.StreamsList)<IStreamListRouterActionPayload, IStreamListRouterActionMeta>(),
};
