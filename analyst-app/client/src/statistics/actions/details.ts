import { createAction as csa } from 'typesafe-actions';
import { IErrorPayload } from 'root/shared/types/actions/errorPayload';
import { ITcpRequestStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpRequestStatisticsDetailsView';
import { ITcpResponseStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpResponseStatisticsDetailsView';

interface IOpenRequestDrawerPayload {
    ip: string;
    mac: string;
}

interface IOpenResponseDrawerPayload {
    ip: string;
    mac: string;
}

interface IFetchRequestDetailsSucceedPayload {
    details: ITcpRequestStatisticsDetailsView;
}

interface IFetchResponseDetailsSucceedPayload {
    details: ITcpResponseStatisticsDetailsView;
}

export enum TcpStatisticsDetailsActionTypes {
    OpenRequestDrawer = 'statistics/details/request/drawer/open',
    CloseRequestDrawer = 'statistics/details/request/drawer/close',
    FetchRequestDetails = 'statistics/details/request/fetch',
    FetchRequestDetailsSucceed = 'statistics/details/request/fetch/succeed',
    FetchRequestDetailsFailed = 'statistics/details/request/fetch/failed',

    OpenResponseDrawer = 'statistics/details/response/drawer/open',
    CloseResponseDrawer = 'statistics/details/response/drawer/close',
    FetchResponseDetails = 'statistics/details/response/fetch',
    FetchResponseDetailsSucceed = 'statistics/details/response/fetch/succeed',
    FetchResponseDetailsFailed = 'statistics/details/response/fetch/failed',
}

export const TcpStatisticsDetailsActions = {
    OpenRequestDrawer: csa(TcpStatisticsDetailsActionTypes.OpenRequestDrawer)<IOpenRequestDrawerPayload>(),
    CloseRequestDrawer: csa(TcpStatisticsDetailsActionTypes.CloseRequestDrawer)(),
    FetchRequestDetails: csa(TcpStatisticsDetailsActionTypes.FetchRequestDetails)(),
    FetchRequestDetailsSucceed: csa(TcpStatisticsDetailsActionTypes.FetchRequestDetailsSucceed)<IFetchRequestDetailsSucceedPayload>(),
    FetchRequestDetailsFailed: csa(TcpStatisticsDetailsActionTypes.FetchRequestDetailsFailed)<IErrorPayload>(),

    OpenResponseDrawer: csa(TcpStatisticsDetailsActionTypes.OpenResponseDrawer)<IOpenResponseDrawerPayload>(),
    CloseResponseDrawer: csa(TcpStatisticsDetailsActionTypes.CloseResponseDrawer)(),
    FetchResponseDetails: csa(TcpStatisticsDetailsActionTypes.FetchResponseDetails)(),
    FetchResponseDetailsSucceed: csa(TcpStatisticsDetailsActionTypes.FetchResponseDetailsSucceed)<IFetchResponseDetailsSucceedPayload>(),
    FetchResponseDetailsFailed: csa(TcpStatisticsDetailsActionTypes.FetchResponseDetailsFailed)<IErrorPayload>(),
};
