import { ITcpSignature } from '../Signature/ITcpSignature';
import { TcpSignatureIpVersion } from '../Signature/TcpSignatureIpVersion';
import { PacketViewIpVersion } from '../../../../DAL/Packet/Ip/PacketViewIpVersion';
import { IPacketViewTcp } from '../../../../DAL/Packet/Tcp/IPacketViewTcp';

export function tcpSignatureCheckIpVersion(packet: IPacketViewTcp, signature: ITcpSignature): boolean {
    switch (signature.ipVersion) {
        case TcpSignatureIpVersion.Ipv4:
            return packet.ip.version === PacketViewIpVersion.IPv6;
        case TcpSignatureIpVersion.Ipv6:
            return packet.ip.version === PacketViewIpVersion.IPv6;
        case TcpSignatureIpVersion.Any:
            return true;
    }
}
