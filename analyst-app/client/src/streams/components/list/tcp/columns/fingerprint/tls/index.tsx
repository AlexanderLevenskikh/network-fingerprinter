import React, { FC } from 'react';
import { Text } from 'root/shared/components/CompatibleAntd';
import styles from './styles.less';
import { Tag, Tooltip } from 'antd';
import { Paragraph } from 'root/shared/components/CompatibleAntd';
import { Nullable } from 'root/shared/types/nullable';

export interface IStreamTlsFingerprintProps {
    userAgents: string[];
    sslBlackListReason: Nullable<string>;
}

export const StreamTlsFingerprint: FC<IStreamTlsFingerprintProps> = ({ userAgents, sslBlackListReason }) => {
    return (
        <Paragraph className={ styles.text }>
            <Text strong>TLS</Text>
            :&nbsp;
            <div className={ styles.list }>
                { sslBlackListReason && (
                    <Tag color='red' style={{ marginBottom: '5px', marginLeft: '2px' }}>
                        SSL Blacklist ({sslBlackListReason})
                    </Tag>
                ) }
                { userAgents.map((userAgent, index) =>(
                    <span key={ index }>
                        <Tooltip placement="topLeft" title={ userAgent }>
                            <Text className={ styles.ellipsis } code ellipsis>
                                { userAgent }
                            </Text>
                        </Tooltip>
                    </span>
                ))}
            </div>

        </Paragraph>
    )
};