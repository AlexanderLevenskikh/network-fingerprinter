import { EnumMap } from 'root/shared/types/enumMap';
import { I18UserNsKeys } from 'root/i18n/resources/user/keys';

export const i18UserNsUsResources: EnumMap<I18UserNsKeys, string> = {
    [I18UserNsKeys.userLoginLabel]: 'Login',
    [I18UserNsKeys.userPasswordLabel]: 'Password',
    [I18UserNsKeys.isUserAdminLabel]: 'Is system admin (can register other users)',
    [I18UserNsKeys.firstUserNameLabel]: 'First name',
    [I18UserNsKeys.lastUserNameLabel]: 'Last name',
    [I18UserNsKeys.middleUserNameLabel]: 'Middle name',
    [I18UserNsKeys.registerButtonLabel]: 'Register',
    [I18UserNsKeys.cancelButtonLabel]: 'Cancel',
    [I18UserNsKeys.requiredField]: 'Field is required'
};
