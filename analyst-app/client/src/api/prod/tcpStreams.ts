import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';
import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { ITcpStreamFilter } from 'DAL/Stream/Tcp/ITcpStreamFilter';
import { ITcpStreamsView } from 'DAL/Stream/Tcp/ITcpStreamsView';

export class TcpStreamsApi implements ITcpStreamsApi {
    getTcpStreamList(
        searchParams: ITcpStreamFilter,
    ): Promise<ITcpStreamsView> {
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
}
