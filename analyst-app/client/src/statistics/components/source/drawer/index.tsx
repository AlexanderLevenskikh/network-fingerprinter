import React, { FC } from 'react';
import { Button, Col, Drawer, Row, Spin } from 'antd';
import Text from 'antd/es/typography/Text';
import { useTcpStatisticsSourceDetailsDrawer } from 'root/statistics/components/source/drawer/hook';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from './styles.less';
import { TcpStatisticsDetailsFingerprints } from 'root/statistics/components/shared/drawer/fingerprints';
import classNames from 'classnames';
import { RouterLink } from 'root/shared/components/RouterLink';

interface IProps {
}

export const TcpStatisticsSourceDetailsDrawer: FC<IProps> = () => {
    const { isOpened, details, loading, close, openStreamsAction } = useTcpStatisticsSourceDetailsDrawer();
    const { tcpFingerprints, tlsFingerprints, httpFingerprints, hasTlsClientHello, hasHttpRequest, mac, ip } = details;

    return (
        <Drawer
            width={ 640 }
            placement="right"
            onClose={ close }
            visible={ isOpened }
        >
            <Spin spinning={ loading } delay={ 100 }>
                <Row className={ styles.titleRow }>
                    <Paragraph>
                        <span className={ styles.title }>
                            Статистика по источнику
                        </span>
                        &nbsp;
                        <Text code>{ ip }</Text>:<Text code>{ mac }</Text>
                    </Paragraph>
                </Row>
                <TcpStatisticsDetailsFingerprints
                    showFingerprints
                    fingerprints={ tcpFingerprints }
                    rowTitle='Цифровой отпечаток TCP'
                />
                <TcpStatisticsDetailsFingerprints
                    showFingerprints={ hasTlsClientHello }
                    fingerprints={ tlsFingerprints }
                    rowTitle='Цифровой отпечаток TLS'
                />
                <TcpStatisticsDetailsFingerprints
                    showFingerprints={ hasHttpRequest }
                    fingerprints={ httpFingerprints }
                    rowTitle={ httpFingerprints.length > 1 ? 'Цифровые отпечатки HTTP' : 'Цифровой отпечаток HTTP' }
                />
                <Row className={ styles.row }>
                    <Col span={ 10 } className={ classNames(styles.col, styles.colTitle) }>
                        Потоки
                    </Col>
                    <Col span={ 14 } className={ styles.col }>
                        <RouterLink
                            to={ openStreamsAction }
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Открыть в новой вкладке
                        </RouterLink>
                    </Col>
                </Row>
            </Spin>
        </Drawer>
    );
};
