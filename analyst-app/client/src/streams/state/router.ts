import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { UdpStreamsSearchParamsModel } from 'root/streams/model/list/udpStreamsSearchParams';

export class StreamRouterState {
    renderList: boolean = false;
    transport: StreamsRouterTransport = StreamsRouterTransport.Tcp;

    tcpStreamsSearchOpened: boolean = false;
    tcpStreamsSearchParamsAreEmpty: boolean = false;
    tcpStreamsSearchParams: TcpStreamsSearchParamsModel = new TcpStreamsSearchParamsModel({});
    tcpStreamsSearchParamsDraft: TcpStreamsSearchParamsModel = new TcpStreamsSearchParamsModel({});

    udpStreamsSearchOpened: boolean = false;
    udpStreamsSearchParamsAreEmpty: boolean = false;
    udpStreamsSearchParams: UdpStreamsSearchParamsModel = new UdpStreamsSearchParamsModel({});
    udpStreamsSearchParamsDraft: UdpStreamsSearchParamsModel = new UdpStreamsSearchParamsModel({});
}
