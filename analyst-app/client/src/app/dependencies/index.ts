import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { IPlayerApi } from 'root/api/interface/player';
import { ITcpStatisticsApi } from 'root/api/interface/tcpStatistics';

export interface IDependencies {
    tcpStreamApi: ITcpStreamsApi;
    tcpStatisticsApi: ITcpStatisticsApi;
    playerApi: IPlayerApi;
}
