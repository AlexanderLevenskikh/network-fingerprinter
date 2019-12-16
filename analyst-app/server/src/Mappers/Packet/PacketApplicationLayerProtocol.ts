import { IPacketEntityLayers } from '../../Entities/Packet/IPacketEntityLayers';
import { PacketViewApplicationLayerProto } from '../../DAL/Packet/PacketViewApplicationLayerProto';

export function mapPacketApplicationLayerProtocol(layers: IPacketEntityLayers): PacketViewApplicationLayerProto {
    if (layers.dns) {
        return PacketViewApplicationLayerProto.Dns;
    }

    if (layers.ssh) {
        return PacketViewApplicationLayerProto.Ssh;
    }

    return PacketViewApplicationLayerProto.Unknown;
}
