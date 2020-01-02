export class PacketViewTcpProviderQueries {
    static buildTcpSynByStreamIdQuery(streamId: string) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { streamId } },
                        { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                        { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '0' } },
                    ],
                },
            },
        };
    }

    static buildTcpSynAckByStreamIdQuery(streamId: string) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { streamId } },
                        { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                        { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '1' } },
                    ],
                },
            },
        };
    }

    static buildTcpPacketApplicationLayersProtocolsByStreamIsQuery(streamId: string) {
        return {
            query: {
                bool: {
                    filter: {
                        term: {
                            streamId,
                        },
                    },
                },
            },
            aggs : {
                protocols : {
                    terms : { field : 'layers.frame.frame_frame_protocols', size: 100 },
                },
            },
        }
    }
}
