import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { TcpStreamsApi } from 'root/api/prod/tcpStreams';
import { IPlayerApi } from 'root/api/interface/player';
import { PlayerApi } from 'root/api/prod/player';

export class ProdDependencies {
    tcpStreamApi: ITcpStreamsApi = new TcpStreamsApi();
    playerApi: IPlayerApi = new PlayerApi();
}
