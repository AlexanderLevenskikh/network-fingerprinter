import { IUserRegistrationModel } from 'root/user/model/registration';
import { IUserRegistrationEvent } from '../../../../server/src/Services/User/IUserRegistrationEvent';

export function mapUserRegistrationModelToEvent(model: IUserRegistrationModel): IUserRegistrationEvent {
    return {
        userName: model.userName.trim(),
        password: model.password.trim(),
        lastName: model.lastName ? model.lastName.trim() : '',
        middleName: model.middleName ? model.middleName.trim() : '',
        firstName: model.firstName ? model.firstName.trim() : '',
        isAdmin: Boolean(model.isAdmin),
    }
}
