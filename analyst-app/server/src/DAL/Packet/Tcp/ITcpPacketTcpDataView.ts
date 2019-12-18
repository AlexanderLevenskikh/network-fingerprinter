import { TcpPacketViewTcpOption } from './TcpPacketViewTcpOption';
import { Nullable } from '../../../Shared/Types/Nullable';

export interface ITcpPacketTcpDataView {
    maximumSegmentSize: number;
    windowSize: number;
    windowScalingFactor: number;
    tcpOptions: TcpPacketViewTcpOption[];
    explicitEndOfOptionsInBytes: Nullable<number>;
    sequenceNumber: number;
    ackNumber: number;
    urgPointer: number;
}
