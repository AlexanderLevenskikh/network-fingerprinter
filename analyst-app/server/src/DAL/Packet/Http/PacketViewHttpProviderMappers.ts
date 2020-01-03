import { SearchResponse } from 'elasticsearch';
import { mapPacketEntityToHttpPacketView } from '../../../Mappers/Packet/Http/PacketEntityToView';
import { IPacketViewHttp } from './IPacketViewHttp';

export class PacketViewHttpProviderMappers {
    public static toHttpPacketViews(response: SearchResponse<any>): IPacketViewHttp[] {
        return response[0]
            .hits
            .hits
            .map(hit => mapPacketEntityToHttpPacketView(hit._source));
    }
}
