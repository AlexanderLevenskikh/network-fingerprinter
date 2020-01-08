import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { TcpStreamsApi } from 'root/api/prod/tcpStreams';
import { IPlayerApi } from 'root/api/interface/player';
import { PlayerApi } from 'root/api/prod/player';
import { ITcpStatisticsApi } from 'root/api/interface/tcpStatistics';
import { TcpStatisticsApi } from 'root/api/prod/tcpStatistics';
import { UserApi } from 'root/api/prod/user';

export class ProdDependencies {
    tcpStreamApi: ITcpStreamsApi = new TcpStreamsApi();
    tcpStatisticsApi: ITcpStatisticsApi = new TcpStatisticsApi();
    playerApi: IPlayerApi = new PlayerApi();
    userApi: UserApi = new UserApi();
}
