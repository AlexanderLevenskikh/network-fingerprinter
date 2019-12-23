import { IPacketViewTcp } from './IPacketViewTcp';
import { Nullable } from '../../../Shared/Types/Nullable';

export interface IPacketViewTcpHandshakeGroup {
    id: number;
    syn: Nullable<IPacketViewTcp>;
    synAck: Nullable<IPacketViewTcp>;
}
