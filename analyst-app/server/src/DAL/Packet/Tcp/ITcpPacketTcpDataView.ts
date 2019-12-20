import { TcpPacketViewTcpOption } from './TcpPacketViewTcpOption';
import { Nullable } from '../../../Shared/Types/Nullable';
import {ITcpPacketViewTcpFlags} from "./ITcpPacketViewTcpFlags";

export interface ITcpPacketTcpDataView {
    maximumSegmentSize: Nullable<number>;
    windowSize: Nullable<number>;
    windowScalingFactor: Nullable<number>;
    tcpOptions: TcpPacketViewTcpOption[];
    tcpFlags: ITcpPacketViewTcpFlags;
    explicitEndOfOptionsInBytes: Nullable<number>;
    sequenceNumber: Nullable<number>;
    ackNumber: Nullable<number>;
    urgPointer: Nullable<number>;
}
