export interface IPacketEntityTls {
    tls_handshake_tls_handshake_version?: string;
    tls_handshake_ciphersuites_tls_handshake_ciphersuite?: string[] | string;
    text_tls_handshake_extension_type?: string[] | string;
    tls_handshake_extensions_supported_groups_tls_handshake_extensions_supported_group?: string[] | string;
    tls_handshake_extensions_ec_point_formats_tls_handshake_extensions_ec_point_format?: string[] | string;
}
