import { createAction as csa } from 'typesafe-actions';

export enum StreamsRouterActionTypes {
    StreamsList = 'streams/router/list',
}

export const StreamsRouterActions = {
    streamsList: csa(StreamsRouterActionTypes.StreamsList)(),
};
