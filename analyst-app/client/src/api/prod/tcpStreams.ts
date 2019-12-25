import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';
import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';

export class TcpStreamsApi implements ITcpStreamsApi {
    getList(): Promise<ITcpStreamView[]> {
        return httpClient({
            controller: 'api/stream/tcp',
            action: 'list',
            method: HttpClientMethod.GET,
            request: {},
            responseType: HttpClientResponseType.JSON,
        });
    }
}
