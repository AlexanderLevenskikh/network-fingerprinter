export interface IUserRegistrationModel {
    userName: string;
    password: string;
    lastName?: string;
    middleName?: string;
    firstName?: string;
    isAdmin: boolean;
}
