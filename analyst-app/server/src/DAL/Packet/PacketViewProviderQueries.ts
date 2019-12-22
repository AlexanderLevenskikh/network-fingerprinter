export class PacketViewProviderQueries {
    static tcpSynOrSynAck = {
        bool: {
            should: [
                {
                    bool: {
                        must: [
                            { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                            { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '0' } },
                        ],
                    },
                },
                {
                    bool: {
                        must: [
                            { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                            { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '1' } },
                        ],
                    },
                },
            ],
            minimum_should_match: 1,
        },
    };

    static buildTcpSynByStreamIdQuery(streamId: number) {
        return {
            bool: {
                filter: [
                    { term: { 'layers.tcp.tcp_tcp_stream': streamId } },
                    { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                    { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '0' } },
                ],
            },
        };
    }

    static buildTcpSynAckByStreamIdQuery(streamId: number) {
        return {
            bool: {
                filter: [
                    { term: { 'layers.tcp.tcp_tcp_stream': streamId } },
                    { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                    { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '1' } },
                ],
            },
        };
    }
}
