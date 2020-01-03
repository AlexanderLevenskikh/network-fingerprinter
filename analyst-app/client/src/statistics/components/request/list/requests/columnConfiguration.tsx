import { ColumnProps } from 'antd/lib/table';
import { TFunction } from 'i18next';
import React from 'react';
import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { I18StatisticsNsKeys } from 'root/i18n/resources/statistics/keys';
import styles from '../styles.less';

export function createTcpRequestsStatisticsColumnsConfiguration(
    t: TFunction,
): ColumnProps<ITcpHostStatisticsView>[] {
    return [
        {
            title: t(I18StatisticsNsKeys.listRequestIpColumnTitle),
            key: 'ip',
            dataIndex: 'ip',
            width: '50%',
            className: styles.column,
        },
        {
            title: t(I18StatisticsNsKeys.listRequestMacColumnTitle),
            key: 'mac',
            dataIndex: 'mac',
            width: '50%',
            className: styles.column,
        },
    ];
}
