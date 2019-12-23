import { SearchResponse } from 'elasticsearch';

export class TcpStreamViewProviderMappers {
    public static toStreamIds(response: SearchResponse<any>): number[] {
        return response[0]
            .aggregations
            .by_stream
            .buckets
            .map(bucket => Number.parseInt(bucket.key.stream, 10))
            .sort(TcpStreamViewProviderMappers.toStreamIdsAscOrder);
    }

    private static toStreamIdsAscOrder(id1: number, id2: number) {
        return id1 - id2;
    }
}
