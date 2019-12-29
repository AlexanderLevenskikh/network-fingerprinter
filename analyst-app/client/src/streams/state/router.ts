import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { UdpStreamsSearchParamsModel } from 'root/streams/model/list/udpStreamsSearchParams';

export class StreamRouterState {
    renderList: boolean = false;
    transport: StreamsRouterTransport = StreamsRouterTransport.Tcp;

    tcpStreamsSearchParams: TcpStreamsSearchParamsModel = new TcpStreamsSearchParamsModel({});
    tcpStreamsSearchParamsDraft: TcpStreamsSearchParamsModel = new TcpStreamsSearchParamsModel({});
    udpStreamsSearchParams: UdpStreamsSearchParamsModel = new UdpStreamsSearchParamsModel({});
    udpStreamsSearchParamsDraft: UdpStreamsSearchParamsModel = new UdpStreamsSearchParamsModel({});
}
