import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';
import { EnumMap } from 'root/shared/types/enumMap';

export const i18StreamsNsRuResources: EnumMap<I18StreamsNsKeys, string> = {
    // list
    [ I18StreamsNsKeys.listTcpHeader ]: 'Потоки TCP-пакетов',
    [ I18StreamsNsKeys.listDateTimeColumnTitle ]: 'Дата и время',
    [ I18StreamsNsKeys.listStartDateTimeColumnTitle ]: 'Начала',
    [ I18StreamsNsKeys.listEndDateTimeColumnTitle ]: 'Окончания',
    [ I18StreamsNsKeys.listSourceColumnTitle ]: 'Источника',
    [ I18StreamsNsKeys.listDestinationColumnTitle ]: 'Назначения',
    [ I18StreamsNsKeys.listAddressColumnTitle ]: 'MAC, IP, Порт',
    [ I18StreamsNsKeys.listPortNumberColumnSubTitle ]: 'Порт',
    [ I18StreamsNsKeys.listFingerprintColumnTitle ]: 'Цифровой отпечаток',
    [ I18StreamsNsKeys.listPacketsCountColumnSubTitle ]: 'Пакетов',
    [ I18StreamsNsKeys.listPacketsApplicationLayerProtoColumnSubTitle ]: 'Прикладные протоколы',
    [ I18StreamsNsKeys.listPacketsSniColumnSubTitle ]: 'SNI',
    [ I18StreamsNsKeys.listSensorIdColumnTitle ]: 'ID сенсора',
    [ I18StreamsNsKeys.filterSourceIp ]: 'IP адрес источника',
    [ I18StreamsNsKeys.filterSourceMac ]: 'MAC адрес источника',
    [ I18StreamsNsKeys.filterSourcePort ]: 'Порт источника',
    [ I18StreamsNsKeys.filterDestinationIp ]: 'IP-адрес назначения',
    [ I18StreamsNsKeys.filterDestinationPort ]: 'Порт назначения',
    [ I18StreamsNsKeys.filterDateRange ]: 'Промежуток дат',
    [ I18StreamsNsKeys.filterSearchButtonLabel ]: 'Поиск',
    [ I18StreamsNsKeys.filterCancelSearchButtonLabel ]: 'Отменить',
};
