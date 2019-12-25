import { IPacketViewFrame } from '../../../DAL/Packet/Frame/IPacketViewEthLayer';
import { TcpStreamViewApplicationProtocol } from '../../../DAL/Stream/Tcp/TcpStreamViewApplicationProtocol';

export function getApplicationLayerProtocolByFrame(frame: IPacketViewFrame): TcpStreamViewApplicationProtocol {
    const protocolsMap = {
        http: TcpStreamViewApplicationProtocol.Http,
        tls: TcpStreamViewApplicationProtocol.Tls,
    };

    const lastProtocol = frame.protocolsInFrame[frame.protocolsInFrame.length - 1];

    return protocolsMap[lastProtocol] || null;
}
