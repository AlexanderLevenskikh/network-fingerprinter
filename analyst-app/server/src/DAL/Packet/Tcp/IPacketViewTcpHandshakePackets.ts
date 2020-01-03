import { IPacketViewTcp } from './IPacketViewTcp';
import { Nullable } from '../../../Shared/Types/Nullable';

export interface IPacketViewTcpHandshakePackets {
    streamId: string;
    syn: Nullable<IPacketViewTcp>;
    synAck: Nullable<IPacketViewTcp>;
}
