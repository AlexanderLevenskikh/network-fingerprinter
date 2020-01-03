import React, { FC } from 'react';
import { Col, Drawer, Row, Spin, Tag } from 'antd';
import Text from 'antd/es/typography/Text';
import { useTcpStatisticsRequestDetailsDrawer } from 'root/statistics/components/request/drawer/request/hook';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from '../styles.less';
import { TcpStatisticsDetailsFingerprints } from 'root/statistics/components/shared/drawer/fingerprints';
import classNames from 'classnames';
import { RouterLink } from 'root/shared/components/RouterLink';
import { I18StatisticsNsKeys } from 'root/i18n/resources/statistics/keys';

interface IProps {
}

export const TcpStatisticsRequestDetailsDrawer: FC<IProps> = () => {
    const { isOpened, details, loading, close, openStreamsAction, t } = useTcpStatisticsRequestDetailsDrawer();
    const {
        tcpFingerprints, tlsFingerprints, httpFingerprints, hasTlsClientHello,
        sslBlackListReasons, hasHttpRequest, mac, ip,
    } = details;

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
                            { t(I18StatisticsNsKeys.detailsRequestTitle) }
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
                    showFingerprints={ hasTlsClientHello }
                    fingerprints={ tlsFingerprints }
                    rowTitle={ t(I18StatisticsNsKeys.detailsTlsFingerprint) }
                />
                { sslBlackListReasons && sslBlackListReasons.length > 0 && (
                    <Row className={ styles.row }>
                        <Col span={ 10 } className={ classNames(styles.col, styles.colTitle) }>
                            SSL Blacklist
                        </Col>
                        <Col span={ 14 } className={ styles.col }>
                            { sslBlackListReasons.map(sslBlackListReason => (
                                <Tag color='red' style={ { marginBottom: '5px', marginLeft: '2px' } }>
                                    { sslBlackListReason }
                                </Tag>
                            )) }
                        </Col>
                    </Row>

                ) }
                <TcpStatisticsDetailsFingerprints
                    t={ t }
                    showFingerprints={ hasHttpRequest }
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
