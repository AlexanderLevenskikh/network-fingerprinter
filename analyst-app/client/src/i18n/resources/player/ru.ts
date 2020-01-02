import { EnumMap } from 'root/shared/types/enumMap';
import { I18PlayerNsKeys } from 'root/i18n/resources/player/keys';

export const i18PlayerNsRuResources: EnumMap<I18PlayerNsKeys, string> = {
    [ I18PlayerNsKeys.draggerTitle ]: 'Нажмите на область или перетащите файлы для загрузки',
    [ I18PlayerNsKeys.draggerMessage ]: 'Допустимые форматы: *.pcap, не более 10 файлов',
    [ I18PlayerNsKeys.succeedUploadMessage ]: 'Файлы успешно загружены',
};
