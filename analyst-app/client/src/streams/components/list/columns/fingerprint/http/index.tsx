import React, { FC } from 'react';
import Text from 'antd/es/typography/Text';
import { IHttpFingerprint } from '../../../../../../../../server/src/Processors/Fingerprint/Http/Fingerprint/IHttpFingerprint';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from './styles.less';
import { Tooltip } from 'antd';

export interface IStreamHttpFingerprintProps {
    fingerprint: IHttpFingerprint;
}

export const StreamHttpFingerprint: FC<IStreamHttpFingerprintProps> = ({ fingerprint }) => {
    const { type, name, flavour, class: fingerprintClass } = fingerprint;
    const text = `${name}${ flavour ? `: ${ flavour }` : '' }`;

    return (
        <Paragraph copyable={{ text: text }}>
            <Text strong>HTTP</Text>
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
