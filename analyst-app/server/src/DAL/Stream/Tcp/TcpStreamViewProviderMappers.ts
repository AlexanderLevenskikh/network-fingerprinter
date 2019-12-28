import { CountResponse, SearchResponse } from 'elasticsearch';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';

export class TcpStreamViewProviderMappers {
    public static toStreamIds(response: SearchResponse<any>): number[] {
        if (!response[0].aggregations) {
            return [];
        }

        return response[0]
            .aggregations
            .by_stream
            .buckets
            .map(bucket => Number.parseInt(bucket.key.streamId, 10))
            .sort(TcpStreamViewProviderMappers.toStreamIdsAscOrder);
    }

    public static toTcpStreamDocumentCount(response: CountResponse): number {
        return response[0].count;
    }

    public static toTcpStreamMetaData(response: SearchResponse<any>): ITcpStreamMetaData {
        const { min_epoch, max_epoch } =  response[0].aggregations;
        const isMinEpochValid = !Number.isNaN(Number.parseFloat(min_epoch.value));
        const isMaxEpochValid = !Number.isNaN(Number.parseFloat(max_epoch.value));
        const startDateTime = isMinEpochValid ? new Date(min_epoch.value * 1000).toISOString() : '';
        const endDateTime = isMaxEpochValid ? new Date(max_epoch.value * 1000).toISOString() : '';

        return {
            startDateTime,
            endDateTime,
        }
    }

    private static toStreamIdsAscOrder(id1: number, id2: number) {
        return id1 - id2;
    }
}
