import React from 'react';
import styles from './styles.less';
import { Paragraph } from 'root/shared/components/CompatibleAntd';
import { Text } from 'root/shared/components/CompatibleAntd';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';
import { TFunction } from 'i18next';
import { notEmpty } from 'root/shared/utils/notEmpty';

interface IArgs {
    ip: string;
    port: number;
    mac: string;
    t: TFunction;
}

export function renderStreamSide({ ip, mac, port, t }: IArgs) {
    return (
        <ul className={ styles.list }>
            { ip && (
                <li>
                    <Paragraph copyable={{ text: ip }}>
                        <Text strong>IP</Text>: <Text code>{ ip }</Text>
                    </Paragraph>
                </li>
            )}
            { mac && (
                <li>
                    <Paragraph copyable={{ text: mac }}>
                        <Text strong>MAC</Text>: <Text code>{ mac }</Text>
                    </Paragraph>
                </li>
            )}
            { notEmpty(port) && (
                <li>
                    <Paragraph copyable={{ text: port.toString() }}>
                        <Text strong>
                            { t(I18StreamsNsKeys.listPortNumberColumnSubTitle) }
                        </Text>: <Text code>{ port }</Text>
                    </Paragraph>
                </li>
            )}
        </ul>
    )
}