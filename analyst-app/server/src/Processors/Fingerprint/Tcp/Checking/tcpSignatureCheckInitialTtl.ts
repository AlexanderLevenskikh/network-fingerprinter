import { ITcpSignature } from '../Signature/ITcpSignature';
import { IPacketViewTcp } from '../../../../DAL/Packet/Tcp/IPacketViewTcp';
import { TcpSignatureInitialTtlMatchType } from '../Signature/TcpSignatureInitialTtlMatchType';

export function tcpSignatureCheckInitialTtl(packet: IPacketViewTcp, signature: ITcpSignature): boolean {
    const { value, match } = signature.initialTtl;
    const isExact = match === TcpSignatureInitialTtlMatchType.Exact;
    const { ttl } = packet.ip;

    return isExact ? ttl === value : ttl <= value;
}
