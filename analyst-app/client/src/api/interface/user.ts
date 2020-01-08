import { IUserView } from 'DAL/User/IUserView';
import { IUserRegistrationEvent } from '../../../../server/src/Services/User/IUserRegistrationEvent';

export interface IUserApi {
    getCurrentUser(): Promise<IUserView>;
    register(event: IUserRegistrationEvent): Promise<any>;
    getUsersList(): Promise<IUserView[]>;
    remove(userId: string): Promise<any>;
}
