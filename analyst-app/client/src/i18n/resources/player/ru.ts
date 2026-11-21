import { EnumMap } from 'root/shared/types/enumMap';
import { I18PlayerNsKeys } from 'root/i18n/resources/player/keys';

export const i18PlayerNsRuResources: EnumMap<I18PlayerNsKeys, string> = {
    [ I18PlayerNsKeys.draggerTitle ]: 'Нажмите или перетащите PCAP для импорта',
    [ I18PlayerNsKeys.draggerMessage ]: 'PCAP до 10 МиБ на файл; можно выбрать несколько файлов',
    [ I18PlayerNsKeys.processing ]: 'Обрабатывается…',
    [ I18PlayerNsKeys.indexed ]: 'Проиндексировано пакетов: {{count}}',
    [ I18PlayerNsKeys.noMatches ]: 'Файл корректен, подходящих пакетов нет',
    [ I18PlayerNsKeys.failed ]: 'Ошибка импорта: {{reason}}. Можно выбрать файл снова.',
};
