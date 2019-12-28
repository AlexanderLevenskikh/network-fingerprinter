import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { TFunction } from 'i18next';
import styles from './styles.less';
import Text from 'antd/es/typography/Text';
import React from 'react';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';

export function renderInfo(stream: ITcpStreamView, t: TFunction) {
    const { packetsCount } = stream;
    return (
        <ul className={ styles.list }>
            <li>
                <Text strong>{ t(I18StreamsNsKeys.listPacketsCountColumnSubTitle) }</Text>
                :&nbsp;
                <Text code>{ packetsCount }</Text>
            </li>
        </ul>
    )
}
