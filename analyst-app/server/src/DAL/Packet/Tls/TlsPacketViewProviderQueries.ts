export class TlsPacketViewProviderQueries {
    static buildClientHelloQueryByStreamId(streamId: string) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { streamId } },
                        { term: { 'layers.tls.tls_handshake_tls_handshake_type': '1' } },
                    ],
                },
            },
        }
    }
}
