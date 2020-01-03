import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';
import { EnumMap } from 'root/shared/types/enumMap';

export const i18StreamsNsUsResources: EnumMap<I18StreamsNsKeys, string> = {
    // list
    [ I18StreamsNsKeys.listTcpHeader ]: 'TCP streams',
    [ I18StreamsNsKeys.listDateTimeColumnTitle ]: 'Date and time',
    [ I18StreamsNsKeys.listStartDateTimeColumnTitle ]: 'Start',
    [ I18StreamsNsKeys.listEndDateTimeColumnTitle ]: 'End',
    [ I18StreamsNsKeys.listSourceColumnTitle ]: 'Source',
    [ I18StreamsNsKeys.listDestinationColumnTitle ]: 'Destination',
    [ I18StreamsNsKeys.listAddressColumnTitle ]: 'MAC, IP, Port',
    [ I18StreamsNsKeys.listPortNumberColumnSubTitle ]: 'Port',
    [ I18StreamsNsKeys.listFingerprintColumnTitle ]: 'Fingerprint',
    [ I18StreamsNsKeys.listPacketsCountColumnSubTitle ]: 'Packets',
    [ I18StreamsNsKeys.listPacketsApplicationLayerProtoColumnSubTitle ]: 'App. layer protocols',
    [ I18StreamsNsKeys.listPacketsSniColumnSubTitle ]: 'SNI',
    [ I18StreamsNsKeys.listSensorIdColumnTitle ]: 'Sensor ID',
    [ I18StreamsNsKeys.filterSourceIp ]: 'Source Ip address',
    [ I18StreamsNsKeys.filterSourceMac ]: 'Source MAC address',
    [ I18StreamsNsKeys.filterSourcePort ]: 'Source port',
    [ I18StreamsNsKeys.filterDestinationIp ]: 'Destination IP address',
    [ I18StreamsNsKeys.filterDestinationPort ]: 'Destination port',
    [ I18StreamsNsKeys.filterDestinationMac ]: 'Destination MAC address',
    [ I18StreamsNsKeys.filterDateRange ]: 'Date range',
    [ I18StreamsNsKeys.filterSearchButtonLabel ]: 'Search',
    [ I18StreamsNsKeys.filterCancelSearchButtonLabel ]: 'Cancel',
};
