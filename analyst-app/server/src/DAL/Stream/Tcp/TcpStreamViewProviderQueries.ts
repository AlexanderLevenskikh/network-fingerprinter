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

    static buildTcpStreamIdsQuery() {
        return {
            query: {
                bool: {
                    filter: {
                        term: {
                            'layers.ip.ip_ip_proto': 6,
                        },
                    },
                },
            },
            aggs : {
                by_stream : {
                    terms : { field : 'streamId', size: 1000000000 },
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
