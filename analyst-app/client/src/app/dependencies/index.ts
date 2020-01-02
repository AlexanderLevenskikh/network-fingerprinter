import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { IPlayerApi } from 'root/api/interface/player';

export interface IDependencies {
    tcpStreamApi: ITcpStreamsApi;
    playerApi: IPlayerApi;
}
