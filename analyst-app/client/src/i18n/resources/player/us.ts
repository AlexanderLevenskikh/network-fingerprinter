import { EnumMap } from 'root/shared/types/enumMap';
import { I18PlayerNsKeys } from 'root/i18n/resources/player/keys';

export const i18PlayerNsUsResources: EnumMap<I18PlayerNsKeys, string> = {
    [ I18PlayerNsKeys.draggerTitle ]: 'Click or drag file to this area to upload',
    [ I18PlayerNsKeys.draggerMessage ]: 'Valid format: *.pcap, no more than 10 files',
    [ I18PlayerNsKeys.succeedUploadMessage ]: 'All files have been uploaded successfully',
};
