import { UserEntity } from '../../Entities/User';
import { IUserView } from '../../DAL/User/IUserView';

export function mapUserEntityToView(entity: UserEntity): IUserView {
    const { userid, firstname, username, isadmin, middlename, lastname } = entity;

    return {
        userId: userid,
        userName: username,
        firstName: firstname,
        lastName: lastname,
        middleName: middlename,
        isAdmin: isadmin,
    }
}
