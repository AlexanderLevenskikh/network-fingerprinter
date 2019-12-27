import { IPacketEntityTls } from '../../../Entities/Packet/IPacketEntityTls';
import { IPacketViewTlsLayer } from '../../../DAL/Packet/Tls/IPacketViewTlsLayer';
import { isEmpty } from '../../../Shared/Utils/isEmpty';

export function mapPacketEntityTlsLayerToView(entity: IPacketEntityTls): IPacketViewTlsLayer {
    const {
        text_tls_handshake_extension_type, tls_handshake_ciphersuites_tls_handshake_ciphersuite,
        tls_handshake_extensions_ec_point_formats_tls_handshake_extensions_ec_point_format,
        tls_handshake_extensions_supported_groups_tls_handshake_extensions_supported_group,
        tls_handshake_tls_handshake_version,
    } = entity;

    const mapInt = (x: string[] | string, radix: number = 10) => {
        if (typeof x === 'string') {
            return [ Number.parseInt(x, radix) ];
        }

        if (Array.isArray(x)) {
            return x.map(suite => Number.parseInt(suite, radix));
        }

        return [];
    };

    return {
        version: Number.parseInt(tls_handshake_tls_handshake_version, 16),
        cipherSuites: mapInt(tls_handshake_ciphersuites_tls_handshake_ciphersuite),
        extensions: mapInt(text_tls_handshake_extension_type),
        supportedEllipticGroups: mapInt(
            tls_handshake_extensions_supported_groups_tls_handshake_extensions_supported_group,
            16,
        ),
        ellipticPointFormats: mapInt(tls_handshake_extensions_ec_point_formats_tls_handshake_extensions_ec_point_format),
    }
}
