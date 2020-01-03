import React, { FC } from 'react';
import { Layout } from 'antd';
import { StatisticsSider } from 'root/statistics/components/sider';
import styles from './styles.less';
import { useSelector } from 'react-redux';
import { TcpStatisticsRouterSelectors } from 'root/statistics/selectors/router';
import { TcpStatisticsTabsEnum } from 'root/statistics/constants/router/tab';
import { TcpSourcesStatisticsList } from 'root/statistics/components/source/list';

interface IProps {
}

const { Content } = Layout;

export const StatisticsPage: FC<IProps> = ({ children }) => {
    const tabName = useSelector(TcpStatisticsRouterSelectors.tabName);
    const isSourcesTab = tabName === TcpStatisticsTabsEnum.Sources;
    const isDestinationsTab = tabName === TcpStatisticsTabsEnum.Destination;

    return (
        <Layout className={ styles.wrapper }>
            <StatisticsSider />
            <Content className={ styles.content }>
                { isSourcesTab && (
                    <TcpSourcesStatisticsList />
                )}
            </Content>
        </Layout>
    );
};
