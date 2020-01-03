import React from 'react';
import styles from './styles.less';
import { TFunction } from 'i18next';
import { StreamTcpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/tcp';
import { StreamHttpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/http';
import { StreamTlsFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/tls';
import { ISourceFingerprintsView } from 'DAL/Fingerprint/Tcp/ISourceFingerprintsView';

interface IArgs {
    fingerprints: ISourceFingerprintsView;
    t: TFunction;
}

export function renderSourceFingerprint({ fingerprints, t }: IArgs) {
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
