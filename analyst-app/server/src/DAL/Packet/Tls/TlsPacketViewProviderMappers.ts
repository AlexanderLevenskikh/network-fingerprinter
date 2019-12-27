import { SearchResponse } from 'elasticsearch';
import { IPacketViewTls } from './IPacketViewTls';
import { mapPacketEntityToTlsPacketView } from '../../../Mappers/Packet/Tls/PacketEntityToView';

export class TlsPacketViewProviderMappers {
    public static toTlsPacketViews(response: SearchResponse<any>): IPacketViewTls[] {
        return response[0]
            .hits
            .hits
            .map(hit => mapPacketEntityToTlsPacketView(hit._source));
    }
}
