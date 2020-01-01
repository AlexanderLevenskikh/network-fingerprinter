import { Nullable } from '../../../Shared/Types/Nullable';
import { IPacketViewHttp } from '../../Packet/Http/IPacketViewHttp';

export interface IHttpStreamRequestAndResponsePackets {
    streamId: string;
    request: Nullable<IPacketViewHttp>;
    response: Nullable<IPacketViewHttp>;
}
