import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { TcpStreamsApi } from 'root/api/prod/tcpStreams';

export class ProdDependencies {
    tcpStreamApi: ITcpStreamsApi = new TcpStreamsApi();
}
