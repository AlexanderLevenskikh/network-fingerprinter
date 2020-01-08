import { I18MainNsKeys } from 'root/i18n/resources/main/keys';
import { EnumMap } from 'root/shared/types/enumMap';

export const i18MainNsRuResources: EnumMap<I18MainNsKeys, string> = {
    [I18MainNsKeys.menuStreamsLabel]: 'Потоки',
    [I18MainNsKeys.menuStatisticsLabel]: 'Статистика',
    [I18MainNsKeys.menuStatisticsRequestsLabel]: 'По клиентам',
    [I18MainNsKeys.menuStatisticsResponsesLabel]: 'По серверам',
    [I18MainNsKeys.menuPlayerLabel]: 'Загрузка *.pcap',
    [I18MainNsKeys.menuUserLogoutLabel]: 'Выйти из системы',
    [I18MainNsKeys.menuUserRegistrationLabel]: 'Зарегистрировать пользователя',
};
