import { IUserView } from 'DAL/User/IUserView';

export class UserState {
    user: IUserView = {
        userId: '',
        userName: '',
        isAdmin: false,
        middleName: null,
        lastName: null,
        firstName: null,
    };
    userLoading: boolean = false;

    usesListModalOpened: boolean = false;
    usersList: IUserView[] = [];
    usersListLoading: boolean = false;

    registrationModalOpened: boolean = false;
    registrationLoading: boolean = false;
    registrationLoadError: boolean = false;
}
