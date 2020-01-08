import { IUserView } from 'DAL/User/IUserView';
import { IUserRegistrationModel } from 'root/user/model/registration';

export class UserState {
    user: IUserView = {
        userName: '',
        isAdmin: false,
        middleName: null,
        lastName: null,
        firstName: null,
    };
    registrationModalOpened: boolean = false;
    registrationLoading: boolean = false;
    registrationLoadError: boolean = false;
    userLoading: boolean = false;
}
