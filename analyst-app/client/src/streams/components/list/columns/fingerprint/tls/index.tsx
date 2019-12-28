import React, { FC } from 'react';
import Text from 'antd/es/typography/Text';
import { ITlsFingerprint } from '../../../../../../../../server/src/Processors/Fingerprint/Tls/Fingerprint/ITlsFingerprint';
import styles from './styles.less';
import { Tooltip } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

export interface IStreamTlsFingerprintProps {
    fingerprint: ITlsFingerprint;
}

export const StreamTlsFingerprint: FC<IStreamTlsFingerprintProps> = ({ fingerprint }) => {
    const { userAgent } = fingerprint;

    return (
        <Paragraph copyable={{ text: userAgent }} className={ styles.text }>
            <Text strong>TLS</Text>
            :&nbsp;
            <Tooltip placement="topLeft" title={ userAgent }>
                <Text className={ styles.ellipsis } code ellipsis>
                    { userAgent }
                </Text>
            </Tooltip>
        </Paragraph>
    )
};
