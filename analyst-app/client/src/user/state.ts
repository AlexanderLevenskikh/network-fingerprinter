import { IUserView } from 'DAL/User/IUserView';

export class UserState {
    user: IUserView = {
        userName: '',
        isAdmin: false,
        middleName: null,
        lastName: null,
        firstName: null,
    };
    userLoading: boolean = false;
}
