import { ITlsFingerprint } from './Fingerprint/ITlsFingerprint';
import { ja3SignaturesMap } from './Ja3/data';
import { IPacketViewTls } from '../../../DAL/Packet/Tls/IPacketViewTls';
import md5 = require('md5');
import { Nullable } from '../../../Shared/Types/Nullable';

export function tlsFingerprintProcessor(packet: IPacketViewTls): Nullable<ITlsFingerprint> {
    const { tls } = packet;
    if (!tls) {
        return null;
    }
    const { version, cipherSuites, ellipticPointFormats, extensions, supportedEllipticGroups } = tls;

    const cipherSuitesStr = cipherSuites.join('-');
    const extensionsStr = extensions.join('-');
    const supportedEllipticGroupsStr = supportedEllipticGroups.join('-');
    const ellipticPointFormatsStr = ellipticPointFormats.join('-');

    const ja3String = `${version},${cipherSuitesStr},${extensionsStr},${supportedEllipticGroupsStr},${ellipticPointFormatsStr}`;
    const ja3md5hash = md5(ja3String);

    const userAgent = ja3SignaturesMap[ ja3md5hash ];

    if (!userAgent) {
        return null;
    }

    return {
        userAgent,
    }
}
