import { UserEntity } from '../../Entities/User';
import { UserModel } from '../../Services/User/UserModel';

export function mapUserEntityToModel(entity: UserEntity): UserModel {
    const { userid, firstname, username, isadmin, middlename, lastname, passwordhash } = entity;

    return {
        userId: userid,
        userName: username,
        passwordHash: passwordhash,
        firstName: firstname,
        lastName: lastname,
        middleName: middlename,
        isAdmin: isadmin,
    }
}
