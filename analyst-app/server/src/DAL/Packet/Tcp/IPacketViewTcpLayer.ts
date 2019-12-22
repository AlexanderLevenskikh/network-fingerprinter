import { PacketViewTcpOption } from './PacketViewTcpOption';
import { Nullable } from '../../../Shared/Types/Nullable';
import {IPacketViewTcpFlags} from './IPacketViewTcpFlags';

export interface IPacketViewTcpLayer {
    streamId: number;
    sourcePort: number;
    destinationPort: number;
    maximumSegmentSize: Nullable<number>;
    windowSize: Nullable<number>;
    windowScalingFactor: Nullable<number>;
    tcpOptions: PacketViewTcpOption[];
    tcpFlags: IPacketViewTcpFlags;
    explicitEndOfOptionsInBytes: Nullable<number>;
    sequenceNumber: Nullable<number>;
    ackNumber: Nullable<number>;
    urgPointer: Nullable<number>;
}
