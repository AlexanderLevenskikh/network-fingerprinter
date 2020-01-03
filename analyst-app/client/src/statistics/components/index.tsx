import React, { FC } from 'react';
import { Layout } from 'antd';
import { StatisticsSider } from 'root/statistics/components/sider';
import styles from './styles.less';

interface IProps {
}

const { Content } = Layout;

export const StatisticsPage: FC<IProps> = ({ children }) => {
    return (
        <Layout className={ styles.wrapper }>
            <StatisticsSider />
            <Content>
                { children }
            </Content>
        </Layout>
    );
};
