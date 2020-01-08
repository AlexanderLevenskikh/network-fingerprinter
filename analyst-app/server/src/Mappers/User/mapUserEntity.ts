import { UserEntity } from '../../Entities/User';
import { IUserView } from '../../DAL/User/IUserView';

export function mapUserEntityToView(entity: UserEntity): IUserView {
    const { firstName, userName, isAdmin, middleName, lastName } = entity;

    return {
        userName,
        firstName,
        lastName,
        middleName,
        isAdmin,
    }
}
