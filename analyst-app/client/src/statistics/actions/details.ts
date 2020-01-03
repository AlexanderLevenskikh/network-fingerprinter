import { createAction as csa } from 'typesafe-actions';
import { IErrorPayload } from 'root/shared/types/actions/errorPayload';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { ITcpSourceStatisticsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsView';
import { ITcpDestinationStatisticsView } from 'DAL/Statistics/Tcp/ITcpDestinationStatisticsView';
import { ITcpSourceStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsDetailsView';
import { ITcpDestinationStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpDestinationStatisticsDetailsView';

interface IOpenSourceDrawerPayload {
    ip: string;
    mac: string;
}

interface IOpenDestinationDrawerPayload {
    ip: string;
}

interface IFetchSourceDetailsSucceedPayload {
    details: ITcpSourceStatisticsDetailsView;
}

interface IFetchDestinationDetailsSucceedPayload {
    details: ITcpDestinationStatisticsDetailsView;
}

export enum TcpStatisticsDetailsActionTypes {
    OpenSourceDrawer = 'statistics/details/source/drawer/open',
    CloseSourceDrawer = 'statistics/details/source/drawer/close',
    FetchSourceDetails = 'statistics/details/source/fetch',
    FetchSourceDetailsSucceed = 'statistics/details/source/fetch/succeed',
    FetchSourceDetailsFailed = 'statistics/details/source/fetch/failed',

    OpenDestinationDrawer = 'statistics/details/destination/drawer/open',
    CloseDestinationDrawer = 'statistics/details/destination/drawer/close',
    FetchDestinationDetails = 'statistics/details/destination/fetch',
    FetchDestinationDetailsSucceed = 'statistics/details/destination/fetch/succeed',
    FetchDestinationDetailsFailed = 'statistics/details/destination/fetch/failed',
}

export const TcpStatisticsDetailsActions = {
    OpenSourceDrawer: csa(TcpStatisticsDetailsActionTypes.OpenSourceDrawer)<IOpenSourceDrawerPayload>(),
    CloseSourceDrawer: csa(TcpStatisticsDetailsActionTypes.CloseSourceDrawer)(),
    FetchSourceDetails: csa(TcpStatisticsDetailsActionTypes.FetchSourceDetails)(),
    FetchSourceDetailsSucceed: csa(TcpStatisticsDetailsActionTypes.FetchSourceDetailsSucceed)<IFetchSourceDetailsSucceedPayload>(),
    FetchSourceDetailsFailed: csa(TcpStatisticsDetailsActionTypes.FetchSourceDetailsFailed)<IErrorPayload>(),

    OpenDestinationDrawer: csa(TcpStatisticsDetailsActionTypes.OpenDestinationDrawer)<IOpenDestinationDrawerPayload>(),
    CloseDestinationDrawer: csa(TcpStatisticsDetailsActionTypes.CloseDestinationDrawer)(),
    FetchDestinationDetails: csa(TcpStatisticsDetailsActionTypes.FetchDestinationDetails)(),
    FetchDestinationDetailsSucceed: csa(TcpStatisticsDetailsActionTypes.FetchDestinationDetailsSucceed)<IFetchDestinationDetailsSucceedPayload>(),
    FetchDestinationDetailsFailed: csa(TcpStatisticsDetailsActionTypes.FetchDestinationDetailsFailed)<IErrorPayload>(),
};
