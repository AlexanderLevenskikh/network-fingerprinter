export class TcpStreamViewProviderQueries {
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

    static queryAllTcpStreamIds = {
        aggs: {
            by_stream: {
                composite: {
                    sources : [
                        {
                            stream: {
                                terms: {
                                    field: 'layers.tcp.tcp_tcp_stream.keyword',
                                },
                            },
                        },
                    ],
                },
            },
        },
    }
}
