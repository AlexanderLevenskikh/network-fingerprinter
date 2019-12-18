import { IPacketEntity } from '../../Entities/Packet/IPacketEntity';
import { IPacketView } from '../../DAL/Packet/IPacketView';
import { mapPacketTransportLayerProtocolToEnum } from './PacketTransportLayerProtocolToEnum';
import { mapPacketEtherType } from './PacketEtherType';
import { mapPacketApplicationLayerProtocol } from './PacketApplicationLayerProtocol';
import { PacketViewTransportLayerProto } from '../../DAL/Packet/PacketViewTransportLayerProto';

export function mapPacketEntityToView(entity: IPacketEntity): IPacketView {
    const { layers, timestamp } = entity;
    const { dns, eth, frame, ip, ssh, tcp, udp } = layers;
    const { eth_eth_type } = eth;

    const etherType = mapPacketEtherType(Number.parseInt(eth_eth_type, 16));

    let transportLayerProto = PacketViewTransportLayerProto.None;
    if (ip) {
        const { ip_ip_proto } = ip;

        transportLayerProto = mapPacketTransportLayerProtocolToEnum(ip_ip_proto);
    }

    const applicationLayerProto = mapPacketApplicationLayerProtocol(layers);

    return {
        etherType,
        transportLayerProto,
        applicationLayerProto,
    };
}
