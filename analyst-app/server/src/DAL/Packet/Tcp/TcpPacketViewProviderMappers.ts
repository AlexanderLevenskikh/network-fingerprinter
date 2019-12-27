import { SearchResponse } from 'elasticsearch';
import { IPacketViewTcp } from './IPacketViewTcp';
import { mapPacketEntityToTcpPacketView } from '../../../Mappers/Packet/Tcp/PacketEntityToView';

export class TcpPacketViewProviderMappers {
    public static toTcpPacketViews(response: SearchResponse<any>): IPacketViewTcp[] {
        return response[0]
            .hits
            .hits
            .map(hit => mapPacketEntityToTcpPacketView(hit._source));
    }
}
