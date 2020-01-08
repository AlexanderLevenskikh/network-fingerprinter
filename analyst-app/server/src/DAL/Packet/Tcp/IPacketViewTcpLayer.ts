import { Nullable } from '../../../Shared/Types/Nullable';
import { IPacketViewTcpFlags } from './IPacketViewTcpFlags';
import { IPacketViewTcpOption } from './IPacketViewTcpOption';

export interface IPacketViewTcpLayer {
    streamId: string;
    sensorId: string;
    sourcePort: number;
    destinationPort: number;
    maximumSegmentSize: Nullable<number>;
    windowSize: Nullable<number>;
    windowScalingFactor: Nullable<number>;
    tcpOptions: IPacketViewTcpOption[];
    tcpFlags: IPacketViewTcpFlags;
    sequenceNumber: Nullable<number>;
    ackNumber: Nullable<number>;
    urgPointer: Nullable<number>;
}
