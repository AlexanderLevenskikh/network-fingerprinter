import { ITcpSourceStatisticsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsView';
import { ITcpDestinationStatisticsView } from 'DAL/Statistics/Tcp/ITcpDestinationStatisticsView';

export class TcpStatisticsListState {
    sources: ITcpSourceStatisticsView[] = [];
    destinations: ITcpDestinationStatisticsView[] = [];
    sourcesLoading: boolean = false;
    destinationsLoading: boolean = false;
}
