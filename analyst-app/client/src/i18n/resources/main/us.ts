import { I18MainNsKeys } from 'root/i18n/resources/main/keys';
import { EnumMap } from 'root/shared/types/enumMap';

export const i18MainNsUsResources: EnumMap<I18MainNsKeys, string> = {
    [ I18MainNsKeys.menuStreamsLabel ]: 'Streams',
    [ I18MainNsKeys.menuStatisticsLabel ]: 'Statistics',
    [ I18MainNsKeys.menuStatisticsSourcesLabel ]: 'By sources',
    [ I18MainNsKeys.menuStatisticsDestinationLabel ]: 'By destination',
    [ I18MainNsKeys.menuPlayerLabel ]: 'Upload *.pcap',
};
