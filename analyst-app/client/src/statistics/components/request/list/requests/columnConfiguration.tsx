import { ColumnsType } from 'antd/es/table/interface';
import { TFunction } from 'i18next';
import React from 'react';
import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { I18StatisticsNsKeys } from 'root/i18n/resources/statistics/keys';
import styles from '../styles.less';

export function createTcpRequestsStatisticsColumnsConfiguration(
    t: TFunction,
): ColumnsType<ITcpHostStatisticsView> {
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