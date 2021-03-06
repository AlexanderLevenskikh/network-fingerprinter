import React, { FC } from 'react';
import { useHeaderMenu } from 'root/shared/components/HeaderMenu/hook';
import Menu from 'antd/es/menu';
import Icon from 'antd/es/icon';
import { I18MainNsKeys } from 'root/i18n/resources/main/keys';
import { RouterPages } from 'root/router/constants/pages';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import SubMenu from 'antd/es/menu/SubMenu';
import { TcpStatisticsTabsEnum } from 'root/statistics/constants/router/tab';

interface IProps {
}

enum MenuItemKey {
    TcpStream = 'TcpStream',
    UdpStream = 'UdpStream',
    Statistics = 'Statistics',
    StatisticsBySource = 'StatisticsBySource',
    StatisticsByDestination = 'StatisticsByDestination',
    Player = 'Player',
}

// UDP streams item temporary disabled
export const HeaderMenu: FC<IProps> = () => {
    const {
        onClickTcpStreams, onClickUdpStreams, onClickStatistics, onClickUpload,
        transport, t, page, statisticsTabName,
    } = useHeaderMenu();

    const tcpStreamsSelected = page === RouterPages.Streams && transport === StreamsRouterTransport.Tcp;
    const udpStreamsSelected = page === RouterPages.Streams && transport === StreamsRouterTransport.Udp;
    const statisticsSelected = page === RouterPages.Statistics;
    const statisticsBySourceSelected = page === RouterPages.Statistics && statisticsTabName === TcpStatisticsTabsEnum.Request;
    const statisticsByDestinationSelected = page === RouterPages.Statistics && statisticsTabName === TcpStatisticsTabsEnum.Response;
    const playerSelected = page === RouterPages.Player;

    const selectedKeys = [
        ...(tcpStreamsSelected ? [ MenuItemKey.TcpStream ] : []),
        ...(udpStreamsSelected ? [ MenuItemKey.UdpStream ] : []),
        ...(statisticsSelected ? [ MenuItemKey.Statistics ] : []),
        ...(statisticsBySourceSelected ? [ MenuItemKey.StatisticsBySource ] : []),
        ...(statisticsByDestinationSelected ? [ MenuItemKey.StatisticsByDestination ] : []),
        ...(playerSelected ? [ MenuItemKey.Player ] : []),
    ];

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={ selectedKeys }
            style={{ lineHeight: '64px' }}
        >
            <Menu.Item
                key={ MenuItemKey.TcpStream }
                onClick={ onClickTcpStreams }
            >
                <Icon type="branches" />
                <span>
                    TCP { t(I18MainNsKeys.menuStreamsLabel) }
                </span>
            </Menu.Item>
            {/*<Menu.Item
                key={ MenuItemKey.UdpStream }
                onClick={ onClickUdpStreams }
            >
                <Icon type="select" />
                <span>
                    UDP { t(I18MainNsKeys.menuStreamsLabel) }
                </span>
            </Menu.Item>*/}
            <SubMenu
                key={ MenuItemKey.Statistics }
                title={
                    <>
                        <Icon type="bar-chart" />
                        <span>
                            { t(I18MainNsKeys.menuStatisticsLabel) }
                        </span>
                    </>
                }
            >
                <Menu.Item
                    key={ MenuItemKey.StatisticsBySource }
                    onClick={ () => onClickStatistics(TcpStatisticsTabsEnum.Request) }
                >
                    <span>
                        { t(I18MainNsKeys.menuStatisticsRequestsLabel) }
                    </span>
                </Menu.Item>
                <Menu.Item
                    key={ MenuItemKey.StatisticsByDestination }
                    onClick={ () => onClickStatistics(TcpStatisticsTabsEnum.Response) }
                >
                    <span>
                        { t(I18MainNsKeys.menuStatisticsResponsesLabel) }
                    </span>
                </Menu.Item>
            </SubMenu>

            <Menu.Item
                key={ MenuItemKey.Player }
                onClick={ onClickUpload }
            >
                <Icon type="upload" />
                <span>
                    { t(I18MainNsKeys.menuPlayerLabel) }
                </span>
            </Menu.Item>
        </Menu>
    );
};
