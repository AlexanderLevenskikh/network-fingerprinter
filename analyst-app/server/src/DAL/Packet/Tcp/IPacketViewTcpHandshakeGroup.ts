import { IPacketViewTcp } from './IPacketViewTcp';
import { Nullable } from '../../../Shared/Types/Nullable';

export interface IPacketViewTcpHandshakeGroup {
    syn: Nullable<IPacketViewTcp>;
    synAck: Nullable<IPacketViewTcp>;
}
