import { SearchResponse } from 'elasticsearch';
import { IPacketViewTcp } from './Tcp/IPacketViewTcp';
import { mapPacketEntityToTcpPacketView } from '../../Mappers/Packet/Tcp/PacketEntityToView';
import { IPacketView } from './IPacketView';
import { mapPacketEntityToView } from '../../Mappers/Packet/PacketEntityToView';

export class PacketViewProviderMappers {
    public static toPacketViews(response: SearchResponse<any>): IPacketView[] {
        return response[0]
            .hits
            .hits
            .map(hit => mapPacketEntityToView(hit._source));
    }

    public static toTcpPacketViews(response: SearchResponse<any>): IPacketViewTcp[] {
        return response[0]
            .hits
            .hits
            .map(hit => mapPacketEntityToTcpPacketView(hit._source));
    }

    public static toHosts(response: SearchResponse<any>): string[] {
        return response[0]
            .aggregations
            .host
            .buckets
            .map(bucket => bucket.key.ip);
    }

    public static toStreamIds(response: SearchResponse<any>): number[] {
        return response[0]
            .aggregations
            .by_stream
            .buckets
            .map(bucket => Number.parseInt(bucket.key.stream, 10))
            .sort(PacketViewProviderMappers.toStreamIdsAscOrder);
    }

    private static toStreamIdsAscOrder(id1: number, id2: number) {
        return id1 - id2;
    }
}
