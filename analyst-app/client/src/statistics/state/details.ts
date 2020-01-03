import { ITcpSourceStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsDetailsView';
import { ITcpDestinationStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpDestinationStatisticsDetailsView';

export class TcpStatisticsDetailsState {
    sourceDetails: ITcpSourceStatisticsDetailsView[] = [];
    sourceDetailsLoading: boolean = false;
    sourceDrawerOpened: boolean = false;
    sourceIp: string = '';
    sourceMac: string = '';

    destinationDetails: ITcpDestinationStatisticsDetailsView[] = [];
    destinationDetailsLoading: boolean = false;
    destinationDetailsDrawerOpened: boolean = false;
    destinationIp: string = '';
}
