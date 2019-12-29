import { createAction as csa } from 'typesafe-actions';
import { SearchParamsModel } from 'root/shared/model/searchParams';

export interface IStreamsChangeSearchParamsPayload {
    model: SearchParamsModel;
}

export enum StreamsSearchActionTypes {
    Open = 'streams/searching/open',
    Close = 'streams/searching/close',
    Search = 'streams/searching/search',
    ChangeSearchParams = 'streams/searching/changeSearchParams',
}

export const StreamsSearchActions = {
    open: csa(StreamsSearchActionTypes.Open)(),
    close: csa(StreamsSearchActionTypes.Close)(),
    search: csa(StreamsSearchActionTypes.Search)(),
    changeSearchParams: csa(StreamsSearchActionTypes.ChangeSearchParams)<IStreamsChangeSearchParamsPayload>(),
};
