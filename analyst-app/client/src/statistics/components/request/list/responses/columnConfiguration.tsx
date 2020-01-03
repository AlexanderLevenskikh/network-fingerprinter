import { ColumnProps } from 'antd/lib/table';
import { TFunction } from 'i18next';
import React from 'react';
import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { I18StatisticsNsKeys } from 'root/i18n/resources/statistics/keys';
import styles from '../styles.less';

export function createTcpResponsesStatisticsColumnsConfiguration(
    t: TFunction,
): ColumnProps<ITcpHostStatisticsView>[] {
    return [
        {
            title: t(I18StatisticsNsKeys.listResponseIpColumnTitle),
            key: 'ip',
            dataIndex: 'ip',
            width: '50%',
            className: styles.column,
        },
        {
            title: t(I18StatisticsNsKeys.listResponseMacColumnTitle),
            key: 'mac',
            dataIndex: 'mac',
            width: '50%',
            className: styles.column,
        },
    ];
}
