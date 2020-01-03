import { createAction as csa } from 'typesafe-actions';
import { IErrorPayload } from 'root/shared/types/actions/errorPayload';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { ITcpSourceStatisticsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsView';
import { ITcpDestinationStatisticsView } from 'DAL/Statistics/Tcp/ITcpDestinationStatisticsView';

interface IFetchSourcesSucceedPayload {
    sources: ITcpSourceStatisticsView[];
}

interface IFetchDestinationsSucceedPayload {
    destinations: ITcpDestinationStatisticsView[];
}

export enum TcpStatisticsListActionTypes {
    FetchSources = 'statistics/sources/list/fetch',
    FetchSourcesSucceed = 'statistics/sources/list/fetch/succeed',
    FetchSourcesFailed = 'statistics/sources/list/fetch/failed',
    FetchDestinations = 'statistics/destinations/list/fetch',
    FetchDestinationsSucceed = 'statistics/destinations/list/fetch/succeed',
    FetchDestinationsFailed = 'statistics/destinations/list/fetch/failed',
}

export const TcpStatisticsListActions = {
    FetchSources: csa(TcpStatisticsListActionTypes.FetchSources)(),
    FetchSourcesSucceed: csa(TcpStatisticsListActionTypes.FetchSourcesSucceed)<IFetchSourcesSucceedPayload>(),
    FetchSourcesFailed: csa(TcpStatisticsListActionTypes.FetchSourcesFailed)<IErrorPayload>(),
    FetchDestinations: csa(TcpStatisticsListActionTypes.FetchDestinations)(),
    FetchDestinationsSucceed: csa(TcpStatisticsListActionTypes.FetchDestinationsSucceed)<IFetchDestinationsSucceedPayload>(),
    FetchDestinationsFailed: csa(TcpStatisticsListActionTypes.FetchDestinationsFailed)<IErrorPayload>(),
};
