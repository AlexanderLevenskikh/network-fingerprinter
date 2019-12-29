import { createAction as csa } from 'typesafe-actions';
import { SearchParamsModel } from 'root/shared/model/searchParams';

export interface IStreamsChangeSearchParamsPayload {
    model: SearchParamsModel;
}

export interface IStreamsSearchPayload {
    model: SearchParamsModel;
}

export enum StreamsSearchActionTypes {
    Search = 'streams/searching/search',
    ChangeSearchParams = 'streams/searching/changeSearchParams',
}

export const StreamsSearchActions = {
    search: csa(StreamsSearchActionTypes.Search)<IStreamsSearchPayload>(),
    changeSearchParams: csa(StreamsSearchActionTypes.ChangeSearchParams)<IStreamsChangeSearchParamsPayload>(),
};
