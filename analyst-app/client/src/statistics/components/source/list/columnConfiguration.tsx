import { ColumnProps } from 'antd/lib/table';
import { TFunction } from 'i18next';
import React from 'react';
import { StreamDatesOrder } from 'root/streams/model/list/streamDatesOrder';
import { ITcpSourceStatisticsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsView';
import { I18StatisticsNsKeys } from 'root/i18n/resources/statistics/keys';
import styles from './styles.less';

export function createTcpSourceStatisticsColumnsConfiguration(
    t: TFunction,
): ColumnProps<ITcpSourceStatisticsView>[] {
    return [
        {
            title: t(I18StatisticsNsKeys.listSourceIpColumnTitle),
            key: 'ip',
            dataIndex: 'ip',
            width: '50%',
            className: styles.column,
        },
        {
            title: t(I18StatisticsNsKeys.listSourceMacColumnTitle),
            key: 'mac',
            dataIndex: 'mac',
            width: '50%',
            className: styles.column,
        },
    ];
}
