import { notEmpty } from '../../Shared/Utils/notEmpty';
import { PacketViewTransportLayerProto } from '../../DAL/Packet/PacketViewTransportLayerProto';

const map: { [key: string]: PacketViewTransportLayerProto } = {
    6: PacketViewTransportLayerProto.Tcp,
    17: PacketViewTransportLayerProto.Udp,
};

export function mapPacketTransportLayerProtocolToEnum(
    protocolNumber: string,
): PacketViewTransportLayerProto {
    const protocol = map[protocolNumber];

    if (notEmpty(protocol)) {
        return protocol;
    }

    return PacketViewTransportLayerProto.Unknown;
}
