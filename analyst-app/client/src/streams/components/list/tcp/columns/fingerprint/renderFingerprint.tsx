import React from 'react';
import styles from './styles.less';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';
import { TFunction } from 'i18next';
import { notEmpty } from 'root/shared/utils/notEmpty';
import { IFingerprints } from '../../../../../../../../server/src/Processors/Fingerprint/IFingerprints';
import { StreamTcpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/tcp';
import { StreamHttpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/http';
import { StreamTlsFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/tls';

interface IArgs {
    fingerprints: IFingerprints;
    t: TFunction;
}

export function renderFingerprint({ fingerprints, t }: IArgs) {
    const { tls, http, tcp } = fingerprints;

    return (
        <ul className={ styles.list }>
            { tcp && (
                <li>
                    <StreamTcpFingerprint
                        fingerprint={ tcp }
                    />
                </li>
            )}
            { http && (
                <li>
                    <StreamHttpFingerprint
                        fingerprint={ http }
                    />
                </li>
            )}
            { tls && (
                <li>
                    <StreamTlsFingerprint
                        fingerprint={ tls }
                    />
                </li>
            )}
        </ul>
    )
}
