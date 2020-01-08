import { I18MainNsKeys } from 'root/i18n/resources/main/keys';
import { EnumMap } from 'root/shared/types/enumMap';

export const i18MainNsUsResources: EnumMap<I18MainNsKeys, string> = {
    [I18MainNsKeys.menuStreamsLabel]: 'Streams',
    [I18MainNsKeys.menuStatisticsLabel]: 'Statistics',
    [I18MainNsKeys.menuStatisticsRequestsLabel]: 'By clients',
    [I18MainNsKeys.menuStatisticsResponsesLabel]: 'By servers',
    [I18MainNsKeys.menuPlayerLabel]: 'Upload *.pcap',
    [I18MainNsKeys.menuUserLogoutLabel]: 'Logout',
    [I18MainNsKeys.menuUserRegistrationLabel]: 'Register user',
    [I18MainNsKeys.menuUsersLabel]: 'Users list',
};
