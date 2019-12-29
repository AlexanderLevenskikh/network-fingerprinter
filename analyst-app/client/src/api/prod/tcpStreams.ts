import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';
import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { ITcpStreamFilter } from 'DAL/Stream/Tcp/ITcpStreamFilter';

export class TcpStreamsApi implements ITcpStreamsApi {
    getTcpStreamList(
        searchParams: ITcpStreamFilter,
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
        searchParams: ITcpStreamFilter,
    ): Promise<number> {
        return httpClient({
            controller: 'api/stream/tcp',
            action: 'list/total',
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
