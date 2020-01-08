import { EnumMap } from 'root/shared/types/enumMap';
import { I18UserNsKeys } from 'root/i18n/resources/user/keys';

export const i18UserNsRuResources: EnumMap<I18UserNsKeys, string> = {
    [I18UserNsKeys.userLoginLabel]: 'Логин',
    [I18UserNsKeys.userPasswordLabel]: 'Пароль',
    [I18UserNsKeys.isUserAdminLabel]: 'Администратор',
    [I18UserNsKeys.firstUserNameLabel]: 'Имя',
    [I18UserNsKeys.lastUserNameLabel]: 'Фамилия',
    [I18UserNsKeys.middleUserNameLabel]: 'Отчество',
    [I18UserNsKeys.registerButtonLabel]: 'Зарегистрировать',
    [I18UserNsKeys.cancelButtonLabel]: 'Отменить',
    [I18UserNsKeys.requiredField]: 'Поле обязательно для заполнения',

    [I18UserNsKeys.usersListLoginLabel]: 'Логин',
    [I18UserNsKeys.usersListAdminLabel]: 'Администратор',
    [I18UserNsKeys.usersListRemoveLabel]: 'Удалить',
};
