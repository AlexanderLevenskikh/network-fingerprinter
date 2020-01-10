import React from 'react';
import styles from './styles.less';
import { TFunction } from 'i18next';
import { StreamTcpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/tcp';
import { StreamHttpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/http';
import { IDestinationFingerprintsView } from 'DAL/Fingerprint/Tcp/IDestinationFingerprintsView';
import { StreamsFingerprintIsUndefined } from 'root/streams/components/list/tcp/columns/fingerprint/undefinedLabel';

interface IArgs {
    fingerprints: IDestinationFingerprintsView;
    t: TFunction;
}

export function renderDestinationFingerprint({ fingerprints, t }: IArgs) {
    const { http, tcp, isHttpUndefined, isTcpUndefined } = fingerprints;

    return (
        <ul className={ styles.list }>
            { tcp && (
                <li>
                    <StreamTcpFingerprint
                        fingerprint={ tcp }
                    />
                </li>
            )}
            { !tcp && isTcpUndefined && (
                <li>
                    <StreamsFingerprintIsUndefined label='TCP'/>
                </li>
            )}
            { http && (
                <li>
                    <StreamHttpFingerprint
                        fingerprint={ http }
                    />
                </li>
            )}
            { !http && isHttpUndefined && (
                <li>
                    <StreamsFingerprintIsUndefined label='HTTP'/>
                </li>
            )}
        </ul>
    )
}
