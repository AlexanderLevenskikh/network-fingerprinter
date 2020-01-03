import React, { FC } from 'react';
import { Layout } from 'antd';
import { StatisticsSider } from 'root/statistics/components/sider';
import styles from './styles.less';
import { useSelector } from 'react-redux';
import { TcpStatisticsRouterSelectors } from 'root/statistics/selectors/router';
import { TcpStatisticsTabsEnum } from 'root/statistics/constants/router/tab';
import { TcpRequestsStatisticsList } from 'root/statistics/components/request/list/requests';
import { TcpStatisticsRequestDetailsDrawer } from 'root/statistics/components/request/drawer/request';
import { TcpResponsesStatisticsList } from 'root/statistics/components/request/list/responses';
import { TcpStatisticsResponseDetailsDrawer } from 'root/statistics/components/request/drawer/response';

interface IProps {
}

const { Content } = Layout;

export const StatisticsPage: FC<IProps> = () => {
    const tabName = useSelector(TcpStatisticsRouterSelectors.tabName);
    const isRequestTab = tabName === TcpStatisticsTabsEnum.Request;
    const isResponseTab = tabName === TcpStatisticsTabsEnum.Response;

    return (
        <Layout className={ styles.wrapper }>
            <StatisticsSider />
            <Content className={ styles.content }>
                { isRequestTab && (
                    <TcpRequestsStatisticsList />
                )}
                { isRequestTab && (
                    <TcpStatisticsRequestDetailsDrawer />
                )}
                { isResponseTab && (
                    <TcpResponsesStatisticsList />
                )}
                { isResponseTab && (
                    <TcpStatisticsResponseDetailsDrawer />
                )}
            </Content>
        </Layout>
    );
};
