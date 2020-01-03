import React, { FC } from 'react';
import { Col, Drawer, Row, Spin } from 'antd';
import Text from 'antd/es/typography/Text';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from '../styles.less';
import { TcpStatisticsDetailsFingerprints } from 'root/statistics/components/shared/drawer/fingerprints';
import classNames from 'classnames';
import { RouterLink } from 'root/shared/components/RouterLink';
import { useTcpStatisticsResponseDetailsDrawer } from 'root/statistics/components/request/drawer/response/hook';
import { I18StatisticsNsKeys } from 'root/i18n/resources/statistics/keys';

interface IProps {
}

export const TcpStatisticsResponseDetailsDrawer: FC<IProps> = () => {
    const { isOpened, details, loading, close, openStreamsAction, t } = useTcpStatisticsResponseDetailsDrawer();
    const { hasHttpResponse, httpFingerprints, ip, mac, tcpFingerprints } = details;

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
                            { t(I18StatisticsNsKeys.detailsResponseTitle) }
                        </span>
                        &nbsp;
                        <Text code>{ ip }</Text>:<Text code>{ mac }</Text>
                    </Paragraph>
                </Row>
                <TcpStatisticsDetailsFingerprints
                    t={ t }
                    showFingerprints
                    fingerprints={ tcpFingerprints }
                    rowTitle={ t(I18StatisticsNsKeys.detailsTcpFingerprint) }
                />
                <TcpStatisticsDetailsFingerprints
                    t={ t }
                    showFingerprints={ hasHttpResponse }
                    fingerprints={ httpFingerprints }
                    rowTitle={ t(I18StatisticsNsKeys.detailsHttpFingerprint) }
                />
                <Row className={ styles.row }>
                    <Col span={ 10 } className={ classNames(styles.col, styles.colTitle) }>
                        { t(I18StatisticsNsKeys.detailsStreams) }
                    </Col>
                    <Col span={ 14 } className={ styles.col }>
                        <RouterLink
                            to={ openStreamsAction }
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            { t(I18StatisticsNsKeys.detailsStreamsOpenInNewTab) }
                        </RouterLink>
                    </Col>
                </Row>
            </Spin>
        </Drawer>
    );
};
