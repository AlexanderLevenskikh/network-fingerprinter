import React, { FC } from 'react';
import { ITcpFingerprint } from '../../../../../../../../../server/src/Processors/Fingerprint/Tcp/Fingerprint/ITcpFingerprint';
import Text from 'antd/es/typography/Text';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from './styles.less';
import { Tooltip } from 'antd';

export interface IStreamFingerprintProps {
    fingerprint: ITcpFingerprint;
}

export const StreamTcpFingerprint: FC<IStreamFingerprintProps> = ({ fingerprint }) => {
    const { type, name, flavour, class: fingerprintClass } = fingerprint;
    const text = `${name}${ flavour ? `: ${ flavour }` : '' }`;

    return (
        <Paragraph copyable={{ text: text }}>
            <Text strong>TCP</Text>
            :&nbsp;
            <Tooltip placement="topLeft" title={ text }>
                <Text
                    code
                    className={ styles.ellipsis }
                >
                    { name }{ flavour ? `: ${flavour}` : '' }
                </Text>
            </Tooltip>
        </Paragraph>
    )
};
