import { IPacketViewTcp } from '../../Packet/Tcp/IPacketViewTcp';
import { Nullable } from '../../../Shared/Types/Nullable';

export interface ITcpStreamHandshakePackets {
    streamId: string;
    syn: Nullable<IPacketViewTcp>;
    synAck: Nullable<IPacketViewTcp>;
}
