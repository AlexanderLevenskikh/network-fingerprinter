import { ITcpSignature } from '../Signature/ITcpSignature';
import { IPacketViewTcp } from '../../../../DAL/Packet/Tcp/IPacketViewTcp';

export function tcpSignatureCheckScalingFactor(packet: IPacketViewTcp, signature: ITcpSignature): boolean {
    if (!signature.scalingFactor) {
        return true;
    }

    return signature.scalingFactor === packet.tcp.windowScalingFactor;
}
