import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { IPlayerApi } from 'root/api/interface/player';
import { ITcpStatisticsApi } from 'root/api/interface/tcpStatistics';
import { UserApi } from 'root/api/prod/user';

export interface IDependencies {
    tcpStreamApi: ITcpStreamsApi;
    tcpStatisticsApi: ITcpStatisticsApi;
    playerApi: IPlayerApi;
    userApi: UserApi;
}
