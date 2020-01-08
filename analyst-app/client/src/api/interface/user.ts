import { IUserView } from 'DAL/User/IUserView';

export interface IUserApi {
    getCurrentUser(): Promise<IUserView>;
}
