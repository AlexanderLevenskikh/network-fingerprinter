export class TcpStreamViewProviderQueries {
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
                    must: [
                        { term: { 'layers.ip.ip_ip_proto': 6 } },
                        {
                            bool: {
                                should: [
                                    { term: { 'layers.tls.tls_handshake_tls_handshake_type': '1' } },
                                    { term: { 'layers.http.http_http_request': '1' } },
                                    { term: { 'layers.http.http_http_response': '1' } },
                                    { term: { 'layers.tcp.tcp_flags_tcp_flags_syn': '1' } },
                                ],
                            },
                        },
                    ],
                },
            },
            aggs: {
                by_stream: {
                    terms: { field: 'streamId', size: 1000000000 },
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
