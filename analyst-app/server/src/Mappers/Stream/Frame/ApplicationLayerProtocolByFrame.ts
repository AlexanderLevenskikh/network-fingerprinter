import { IPacketViewFrame } from '../../../DAL/Packet/Frame/IPacketViewEthLayer';
import { PacketViewTcpApplicationProtocol } from '../../../DAL/Packet/Tcp/PacketViewTcpApplicationProtocol';

export function getApplicationLayerProtocolByFrame(frame: IPacketViewFrame): PacketViewTcpApplicationProtocol {
    const protocolsMap = {
        http: PacketViewTcpApplicationProtocol.Http,
        tls: PacketViewTcpApplicationProtocol.Tls,
    };

    const lastProtocol = frame.protocolsInFrame[frame.protocolsInFrame.length - 1];

    return protocolsMap[lastProtocol] || null;
}
