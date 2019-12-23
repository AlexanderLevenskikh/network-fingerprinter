import { ColumnProps } from 'antd/lib/table';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { TFunction } from 'i18next';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';

export function createColumnsConfiguration(t: TFunction): ColumnProps<ITcpStreamView>[] {
    return [
        {
            title: t(I18StreamsNsKeys.listStartDateTimeColumnTitle),
            dataIndex: 'os',
            sorter: true,
            width: '10%',
        },
        {
            title: t(I18StreamsNsKeys.listEndDateTimeColumnTitle),
            dataIndex: 'os',
            sorter: true,
            width: '10%',
        },
        {
            title: t(I18StreamsNsKeys.listSourceColumnTitle),
            dataIndex: 'os',
            sorter: true,
            width: '15%',
        },
        {
            title: t(I18StreamsNsKeys.listDestinationColumnTitle),
            dataIndex: 'os',
            sorter: true,
            width: '15%',
        },
        {
            title: t(I18StreamsNsKeys.listSourceFingerprintCountColumnTitle),
            dataIndex: 'os',
            sorter: true,
            width: '15%',
        },
        {
            title: t(I18StreamsNsKeys.listDestinationFingerprintCountColumnTitle),
            dataIndex: 'os',
            sorter: true,
            width: '15%',
        },
        {
            title: t(I18StreamsNsKeys.listPacketsCountColumnTitle),
            dataIndex: 'os',
            sorter: true,
            width: '10%',
        },
        {
            title: t(I18StreamsNsKeys.listSensorIdColumnTitle),
            dataIndex: 'os',
            sorter: true,
            width: '10%',
        },
    ];
}
