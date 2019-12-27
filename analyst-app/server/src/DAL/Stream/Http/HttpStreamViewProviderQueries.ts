export class HttpStreamViewProviderQueries {
    static buildHttpRequestQueryByStreamId(streamId: number) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { 'layers.tcp.tcp_tcp_stream': streamId } },
                        { term: { 'layers.http.http_http_request': '1' } },
                    ],
                },
            },
        }
    }

    static buildHttpResponseQueryByStreamId(streamId: number) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { 'layers.tcp.tcp_tcp_stream': streamId } },
                        { term: { 'layers.http.http_http_response': '1' } },
                    ],
                },
            },
        }
    }
}
