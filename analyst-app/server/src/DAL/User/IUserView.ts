import { Nullable } from '../../Shared/Types/Nullable';

export interface IUserView {
    userId: string;
    userName: string;
    isAdmin: boolean;
    firstName: Nullable<string>;
    lastName: Nullable<string>;
    middleName: Nullable<string>;
}
