export class TcpStreamViewProviderQueries {
    static buildTcpSynByStreamIdQuery(streamId: number) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { 'layers.tcp.tcp_tcp_stream': streamId } },
                        { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                        { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '0' } },
                    ],
                },
            },
        };
    }

    static buildTcpSynAckByStreamIdQuery(streamId: number) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { 'layers.tcp.tcp_tcp_stream': streamId } },
                        { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                        { term: { 'layers.tcp.tcp_flags_tcp_flags_ack': '1' } },
                    ],
                },
            },
        };
    }

    static buildTcpStreamMetaDataQuery(streamId: number) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { 'layers.tcp.tcp_tcp_stream': streamId } },
                    ],
                },
            },
            size: 0,
            aggs: {
                min_epoch: {
                    min: {
                        field: 'layers.frame.frame_frame_time_epoch',
                    },
                },
                max_epoch: {
                    max: {
                        field: 'layers.frame.frame_frame_time_epoch',
                    },
                },
            },
        };
    }

    static buildTcpStreamIdsQuery(size: number) {
        return {
            aggs: {
                by_stream: {
                    composite: {
                        size,
                        sources : [
                            { streamId: { terms: { field: 'layers.tcp.tcp_tcp_stream.keyword' } } },
                        ],
                    },
                },
            },
        }
    }

    static buildTcpStreamQuery(streamId: number) {
        return {
            bool: {
                filter: [
                    { term: { 'layers.tcp.tcp_tcp_stream': streamId } },
                ],
            },
        }
    }
}
