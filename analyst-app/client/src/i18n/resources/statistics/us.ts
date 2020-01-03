import { EnumMap } from 'root/shared/types/enumMap';
import { I18StatisticsNsKeys } from 'root/i18n/resources/statistics/keys';

export const i18StatisticsNsUsResources: EnumMap<I18StatisticsNsKeys, string> = {
    // list
    [ I18StatisticsNsKeys.listRequestIpColumnTitle ]: 'Client IP-address',
    [ I18StatisticsNsKeys.listRequestMacColumnTitle ]: 'Client MAC-address',
    [ I18StatisticsNsKeys.listResponseIpColumnTitle ]: 'Server IP-address',
    [ I18StatisticsNsKeys.listResponseMacColumnTitle ]: 'Server MAC-address',

    // details
    [I18StatisticsNsKeys.detailsRequestTitle]: 'Statistics by client',
    [I18StatisticsNsKeys.detailsResponseTitle]: 'Statistics by server',
    [I18StatisticsNsKeys.detailsSeveralMatches]: 'Multiple matches found',
    [I18StatisticsNsKeys.detailsNotRecognized]: 'Undefined',
    [I18StatisticsNsKeys.detailsTcpFingerprint]: 'TCP fingerprint',
    [I18StatisticsNsKeys.detailsTlsFingerprint]: 'TLS fingerprint',
    [I18StatisticsNsKeys.detailsHttpFingerprint]: 'HTTP fingerprint',
    [I18StatisticsNsKeys.detailsStreams]: 'Streams',
    [I18StatisticsNsKeys.detailsStreamsOpenInNewTab]: 'Open in new tab',
    [I18StatisticsNsKeys.detailsAddSignature]: 'Add signature?',
};
