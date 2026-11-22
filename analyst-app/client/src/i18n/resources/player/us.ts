import { EnumMap } from 'root/shared/types/enumMap';
import { I18PlayerNsKeys } from 'root/i18n/resources/player/keys';

export const i18PlayerNsUsResources: EnumMap<I18PlayerNsKeys, string> = {
    [ I18PlayerNsKeys.draggerTitle ]: 'Click or drag PCAP files to import',
    [ I18PlayerNsKeys.draggerMessage ]: 'PCAP up to 10 MiB per file; multiple files supported',
    [ I18PlayerNsKeys.processing ]: 'Processing…',
    [ I18PlayerNsKeys.indexed ]: 'Indexed packets: {{count}}',
    [ I18PlayerNsKeys.noMatches ]: 'Valid file; no matching packets',
    [ I18PlayerNsKeys.failed ]: 'Import failed: {{reason}}. You can choose another file.',
};
