import { IPacketViewTls } from '../../../DAL/Packet/Tls/IPacketViewTls';
import { TlsFingerprint } from './Fingerprint/TlsFingerprint';
import { ja3SignaturesMap } from './Ja3/data';
import md5 = require('md5');

export function tlsFingerprintProcessor(packet: IPacketViewTls): TlsFingerprint {
    const { version, cipherSuites, ellipticPointFormats, extensions, supportedEllipticGroups } = packet;
    const cipherSuitesStr = cipherSuites.join('-');
    const extensionsStr = extensions.join('-');
    const supportedEllipticGroupsStr = supportedEllipticGroups.join('-');
    const ellipticPointFormatsStr = ellipticPointFormats.join('-');

    const ja3String = `${version},${cipherSuitesStr},${extensionsStr},${supportedEllipticGroupsStr},${ellipticPointFormatsStr}`;
    const ja3md5hash = md5(ja3String);

    const userAgent = ja3SignaturesMap[ ja3md5hash ];

    return {
        userAgent,
    }
}
