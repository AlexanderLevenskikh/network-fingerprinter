import { Nullable } from '../../Shared/Types/Nullable';

export class UserModel {
    userId: string;
    userName: string;
    passwordHash: string;
    isAdmin: boolean;
    firstName: Nullable<string>;
    lastName: Nullable<string>;
    middleName: Nullable<string>;
}
