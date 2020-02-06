import { IUserView } from '../../DAL/User/IUserView';
import { UserModel } from '../../Services/User/UserModel';

export function mapUserModelToView(entity: UserModel): IUserView {
    const { middleName, lastName, firstName, userId, isAdmin, userName } = entity;

    return {
        userId,
        userName,
        firstName,
        lastName,
        middleName,
        isAdmin,
    }
}
