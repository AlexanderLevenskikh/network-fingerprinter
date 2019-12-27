import { SearchResponse } from 'elasticsearch';
import { IPacketView } from './IPacketView';
import { mapPacketEntityToView } from '../../Mappers/Packet/PacketEntityToView';

export class PacketViewProviderMappers {
    public static toPacketViews(response: SearchResponse<any>): IPacketView[] {
        return response[0]
            .hits
            .hits
            .map(hit => mapPacketEntityToView(hit._source));
    }

    public static toHosts(response: SearchResponse<any>): string[] {
        return response[0]
            .aggregations
            .host
            .buckets
            .map(bucket => bucket.key.ip);
    }
}
