export class TlsPacketViewProviderQueries {
    static buildClientHelloQueryByStreamId(streamId: number) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { 'layers.tcp.tcp_tcp_stream': streamId } },
                        { term: { 'layers.tls.tls_handshake_tls_handshake_type': '1' } },
                    ],
                },
            },
        }
    }
}
