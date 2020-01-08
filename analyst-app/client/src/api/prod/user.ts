import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';
import { ITcpStreamsApi } from 'root/api/interface/tcpStreams';
import { ITcpStreamFilter } from 'DAL/Stream/Tcp/ITcpStreamFilter';
import { ITcpStreamsView } from 'DAL/Stream/Tcp/ITcpStreamsView';
import { IUserApi } from 'root/api/interface/user';
import { IUserView } from 'DAL/User/IUserView';

export class UserApi implements IUserApi {
    getCurrentUser(): Promise<IUserView> {
        return httpClient({
            controller: 'api/user',
            action: 'current',
            method: HttpClientMethod.GET,
            request: {},
            responseType: HttpClientResponseType.JSON,
        });
    }

    logout(): Promise<IUserView> {
        return httpClient({
            controller: 'api/auth',
            action: 'logout',
            method: HttpClientMethod.GET,
            request: {},
            responseType: HttpClientResponseType.JSON,
        });
    }
}
