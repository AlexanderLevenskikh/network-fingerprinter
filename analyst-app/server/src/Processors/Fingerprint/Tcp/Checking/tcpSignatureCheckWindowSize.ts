import { ITcpSignature } from '../Signature/ITcpSignature';
import { IPacketViewTcp } from '../../../../DAL/Packet/Tcp/IPacketViewTcp';
import { TcpSignatureWindowSizeValueType } from '../Signature/TcpSignatureWindowSizeValueType';

export function tcpSignatureCheckWindowSize(packet: IPacketViewTcp, signature: ITcpSignature): boolean {
    const { valueType, value } = signature.windowSize;
    const isExact = valueType === TcpSignatureWindowSizeValueType.Exact;
    const { windowSize, maximumSegmentSize } = packet.tcp;

    return isExact ? windowSize === value : maximumSegmentSize * value === windowSize;
}
