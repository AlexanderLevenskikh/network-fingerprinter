import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';

export interface ITcpStreamsApi {
    getTcpStreamList(
        searchParams: TcpStreamsSearchParamsModel,
    ): Promise<ITcpStreamView[]>;

    getTcpStreamListTotal(
        searchParams: TcpStreamsSearchParamsModel,
    ): Promise<number>;
}
