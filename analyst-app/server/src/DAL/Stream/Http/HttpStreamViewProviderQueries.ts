export class HttpStreamViewProviderQueries {
    static buildHttpRequestQueryByStreamId(streamId: string) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { streamId } },
                        { term: { 'layers.http.http_http_request': '1' } },
                    ],
                },
            },
        }
    }

    static buildHttpResponseQueryByStreamId(streamId: string) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { streamId } },
                        { term: { 'layers.http.http_http_response': '1' } },
                    ],
                },
            },
        }
    }
}
