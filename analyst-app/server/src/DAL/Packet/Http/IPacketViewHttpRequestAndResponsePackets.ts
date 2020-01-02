import { Nullable } from '../../../Shared/Types/Nullable';
import { IPacketViewHttp } from './IPacketViewHttp';

export interface IPacketViewHttpRequestAndResponsePackets {
    streamId: string;
    request: Nullable<IPacketViewHttp>;
    response: Nullable<IPacketViewHttp>;
}
