import React from 'react';
import styles from './styles.less';
import { TFunction } from 'i18next';
import { StreamTcpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/tcp';
import { StreamHttpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/http';
import { IDestinationFingerprintsView } from 'DAL/Fingerprint/Tcp/IDestinationFingerprintsView';

interface IArgs {
    fingerprints: IDestinationFingerprintsView;
    t: TFunction;
}

export function renderDestinationFingerprint({ fingerprints, t }: IArgs) {
    const { http, tcp } = fingerprints;

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
        </ul>
    )
}
