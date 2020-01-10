import React from 'react';
import styles from './styles.less';
import { TFunction } from 'i18next';
import { StreamTcpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/tcp';
import { StreamHttpFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/http';
import { StreamTlsFingerprint } from 'root/streams/components/list/tcp/columns/fingerprint/tls';
import { ISourceFingerprintsView } from 'DAL/Fingerprint/Tcp/ISourceFingerprintsView';
import { StreamsFingerprintIsUndefined } from 'root/streams/components/list/tcp/columns/fingerprint/undefinedLabel';

interface IArgs {
    fingerprints: ISourceFingerprintsView;
    t: TFunction;
}

export function renderSourceFingerprint({ fingerprints, t }: IArgs) {
    const { tls, http, tcp, isHttpUndefined, isTlsUndefined, isTcpUndefined } = fingerprints;

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
            { tls && Array.isArray(tls.userAgent) &&  (
                <li>
                    <StreamTlsFingerprint
                        userAgents={ tls.userAgent }
                        sslBlackListReason={ tls.sslBlackListReason }
                    />
                </li>
            )}
            { !(tls && Array.isArray(tls.userAgent)) && isTlsUndefined && (
                <li>
                    <StreamsFingerprintIsUndefined label='TLS'/>
                </li>
            )}
        </ul>
    )
}
