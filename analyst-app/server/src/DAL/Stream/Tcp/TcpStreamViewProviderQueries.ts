export class TcpStreamViewProviderQueries {
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

    static buildTcpPacketSampleByStreamIdQuery(streamId: string) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { streamId } },
                        { exists: { field: 'layers.tcp.tcp_tcp_payload' } },
                    ],
                },
            },
        };
    }

    static buildTcpStreamMetaDataQuery(streamId: string) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { streamId } },
                    ],
                },
            },
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
                            { streamId: { terms: { field: 'streamId' } } },
                        ],
                    },
                },
            },
        }
    }

    static buildTcpStreamDocumentCountQuery(streamId: string) {
        return {
            query: {
                term: {
                    streamId,
                },
            },
        };
    }

    static buildTcpStreamQuery(streamId: string) {
        return {
            bool: {
                filter: [
                    { term: { streamId } },
                ],
            },
        }
    }
}
