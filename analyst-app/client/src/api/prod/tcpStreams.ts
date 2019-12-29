import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';
import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';

export class TcpStreamsApi implements ITcpStreamsApi {
    getTcpStreamList(
        searchParams: TcpStreamsSearchParamsModel,
    ): Promise<ITcpStreamView[]> {
        return httpClient({
            controller: 'api/stream/tcp',
            action: 'list',
            method: HttpClientMethod.GET,
            request: {
                query: {
                    ...searchParams,
                }
            },
            responseType: HttpClientResponseType.JSON,
        });
    }

    getTcpStreamListTotal(
        searchParams: TcpStreamsSearchParamsModel,
    ): Promise<number> {
        return httpClient({
            controller: 'api/stream/tcp/total',
            action: 'list',
            method: HttpClientMethod.GET,
            request: {
                query: {
                    ...searchParams,
                }
            },
            responseType: HttpClientResponseType.JSON,
        });
    }
}
