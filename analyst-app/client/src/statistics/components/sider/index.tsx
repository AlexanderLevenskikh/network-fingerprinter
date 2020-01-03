import React, { FC } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Icon, Menu } from 'antd';
import { useStatisticsSider } from 'root/statistics/components/sider/hook';
import { TcpStatisticsTabsEnum } from 'root/statistics/constants/router/tab';
import { I18MainNsKeys } from 'root/i18n/resources/main/keys';

interface IProps {
}

enum MenuItemKey {
    StatisticsBySource = 'StatisticsBySource',
    StatisticsByDestination = 'StatisticsByDestination',
}

export const StatisticsSider: FC<IProps> = () => {
    const { statisticsTabName, t, onClickStatistics } = useStatisticsSider();

    const statisticsBySourceSelected = statisticsTabName === TcpStatisticsTabsEnum.Sources;
    const statisticsByDestinationSelected = statisticsTabName === TcpStatisticsTabsEnum.Destination;

    const selectedKeys = [
        ...(statisticsBySourceSelected ? [ MenuItemKey.StatisticsBySource ] : []),
        ...(statisticsByDestinationSelected ? [ MenuItemKey.StatisticsByDestination ] : []),
    ];

    return (
        <Sider>
            <Menu
                theme="dark"
                selectedKeys={ selectedKeys }
                mode="inline"
            >
                <Menu.Item
                    key={ MenuItemKey.StatisticsBySource }
                    onClick={ () => onClickStatistics(TcpStatisticsTabsEnum.Sources) }
                >
                    <Icon type="logout" />
                    <span>
                        { t(I18MainNsKeys.menuStatisticsSourcesLabel) }
                    </span>
                </Menu.Item>
                <Menu.Item
                    key={ MenuItemKey.StatisticsByDestination }
                    onClick={ () => onClickStatistics(TcpStatisticsTabsEnum.Destination) }
                >
                    <Icon type="login" />
                    <span>
                        { t(I18MainNsKeys.menuStatisticsDestinationLabel) }
                    </span>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};
