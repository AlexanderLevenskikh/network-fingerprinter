import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';
import { IUserApi } from 'root/api/interface/user';
import { IUserView } from 'DAL/User/IUserView';
import { UserModel } from '../../../../server/src/Services/User/UserModel';
import { IUserRegistrationEvent } from '../../../../server/src/Services/User/IUserRegistrationEvent';

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

    register(event: IUserRegistrationEvent): Promise<any> {
        return httpClient({
            controller: 'api/user',
            action: 'register',
            method: HttpClientMethod.POST,
            request: {
                body: {
                    ...event,
                }
            },
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
