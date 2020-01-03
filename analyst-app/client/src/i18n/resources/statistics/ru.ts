import { EnumMap } from 'root/shared/types/enumMap';
import { I18StatisticsNsKeys } from 'root/i18n/resources/statistics/keys';

export const i18StatisticsNsRuResources: EnumMap<I18StatisticsNsKeys, string> = {
    // list
    [ I18StatisticsNsKeys.listRequestIpColumnTitle ]: 'IP-адрес клиента',
    [ I18StatisticsNsKeys.listRequestMacColumnTitle ]: 'MAC-адрес клиента',
    [ I18StatisticsNsKeys.listResponseIpColumnTitle ]: 'IP-адрес сервера',
    [ I18StatisticsNsKeys.listResponseMacColumnTitle ]: 'MAC-адрес сервера',

    // details
    [I18StatisticsNsKeys.detailsRequestTitle]: 'Статистика по клиенту',
    [I18StatisticsNsKeys.detailsResponseTitle]: 'Статистика по серверу',
    [I18StatisticsNsKeys.detailsSeveralMatches]: 'Обнаружено несколько совпадений',
    [I18StatisticsNsKeys.detailsNotRecognized]: 'Не определен',
    [I18StatisticsNsKeys.detailsTcpFingerprint]: 'Цифровой отпечаток TCP',
    [I18StatisticsNsKeys.detailsTlsFingerprint]: 'Цифровой отпечаток TLS',
    [I18StatisticsNsKeys.detailsHttpFingerprint]: 'Цифровой отпечаток HTTP',
    [I18StatisticsNsKeys.detailsStreams]: 'Потоки',
    [I18StatisticsNsKeys.detailsStreamsOpenInNewTab]: 'Открыть в новой вкладке',
    [I18StatisticsNsKeys.detailsAddSignature]: 'Добавить сигнатуру?',
};
