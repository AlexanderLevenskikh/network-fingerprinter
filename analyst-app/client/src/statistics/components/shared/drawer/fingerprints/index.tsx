import React, { FC } from 'react';
import { Row, Tag, Anchor, Col, Button, Tooltip } from 'antd';
import Text from 'antd/es/typography/Text';
import styles from './styles.less';
import classNames from 'classnames';
import Paragraph from 'antd/es/typography/Paragraph';
import { TFunction } from 'i18next';
import { I18StatisticsNsKeys } from 'root/i18n/resources/statistics/keys';

interface IProps {
    rowTitle: string;
    showFingerprints: boolean;
    fingerprints: string[];
    t: TFunction;
    onAddSignature?(): void;
}

export const TcpStatisticsDetailsFingerprints: FC<IProps> = props => {
    const { fingerprints, onAddSignature, rowTitle, showFingerprints, t } = props;

    if (!showFingerprints) {
        return null;
    }

    const renderFingerprints = () => {
        if (fingerprints.length === 0) {
            return (
                <>
                    <Tag color="red">
                        { t(I18StatisticsNsKeys.detailsNotRecognized) }
                    </Tag>
                    { onAddSignature && (
                        <Button type='link'>
                            { t(I18StatisticsNsKeys.detailsAddSignature) }
                        </Button>
                    )}
                </>
            )
        }

        if (fingerprints.length === 1) {
            return (
                <Paragraph copyable={{ text: fingerprints[0] }} className={ styles.paragraph }>
                    <Tooltip placement="topLeft" title={ fingerprints[0] }>
                        <Text
                            code
                            className={ styles.ellipsis }
                            ellipsis
                        >
                            { fingerprints[0] }
                        </Text>
                    </Tooltip>
                </Paragraph>
            )
        }

        return (
            <ul className={ styles.ul }>
                <li>
                    <Tag color="orange">
                        { t(I18StatisticsNsKeys.detailsSeveralMatches) }
                    </Tag>
                </li>
                { fingerprints.map((fingerprint, index) => {
                    return (
                        <li key={ index }>
                            <Paragraph copyable={{ text: fingerprint }} className={ styles.paragraph }>
                                <Tooltip placement="topLeft" title={ fingerprint }>
                                    <Text
                                        code
                                        className={ styles.ellipsis }
                                        ellipsis
                                    >
                                        { fingerprint }
                                    </Text>
                                </Tooltip>
                            </Paragraph>
                        </li>
                    )
                })}
            </ul>
        )
    };

    return (
        <Row className={ styles.row }>
            <Col span={ 10 } className={ classNames(styles.col, styles.colTitle) }>
                { rowTitle }
            </Col>
            <Col span={ 14 } className={ styles.col }>
                { renderFingerprints() }
            </Col>
        </Row>
    );
};
