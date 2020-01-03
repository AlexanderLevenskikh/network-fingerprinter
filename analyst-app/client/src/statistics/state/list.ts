import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';

export class TcpStatisticsListState {
    requests: ITcpHostStatisticsView[] = [];
    responses: ITcpHostStatisticsView[] = [];
    requestsLoading: boolean = false;
    responsesLoading: boolean = false;
}
