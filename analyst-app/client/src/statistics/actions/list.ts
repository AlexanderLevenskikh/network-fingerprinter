import { createAction as csa } from 'typesafe-actions';
import { IErrorPayload } from 'root/shared/types/actions/errorPayload';
import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';

interface IFetchRequestsSucceedPayload {
    requests: ITcpHostStatisticsView[];
}

interface IFetchResponsesSucceedPayload {
    responses: ITcpHostStatisticsView[];
}

export enum TcpStatisticsListActionTypes {
    FetchRequests = 'statistics/requests/list/fetch',
    FetchRequestsSucceed = 'statistics/requests/list/fetch/succeed',
    FetchRequestsFailed = 'statistics/requests/list/fetch/failed',
    FetchResponses = 'statistics/responses/list/fetch',
    FetchResponsesSucceed = 'statistics/responses/list/fetch/succeed',
    FetchResponsesFailed = 'statistics/responses/list/fetch/failed',
}

export const TcpStatisticsListActions = {
    FetchRequests: csa(TcpStatisticsListActionTypes.FetchRequests)(),
    FetchRequestsSucceed: csa(TcpStatisticsListActionTypes.FetchRequestsSucceed)<IFetchRequestsSucceedPayload>(),
    FetchRequestsFailed: csa(TcpStatisticsListActionTypes.FetchRequestsFailed)<IErrorPayload>(),
    FetchResponses: csa(TcpStatisticsListActionTypes.FetchResponses)(),
    FetchResponsesSucceed: csa(TcpStatisticsListActionTypes.FetchResponsesSucceed)<IFetchResponsesSucceedPayload>(),
    FetchResponsesFailed: csa(TcpStatisticsListActionTypes.FetchResponsesFailed)<IErrorPayload>(),
};
