import { UserEntity } from '../../Entities/User';
import { IUserView } from '../../DAL/User/IUserView';

export function mapUserEntityToView(entity: UserEntity): IUserView {
    const { userId, firstName, userName, isAdmin, middleName, lastName } = entity;

    return {
        userId,
        userName,
        firstName,
        lastName,
        middleName,
        isAdmin,
    }
}
