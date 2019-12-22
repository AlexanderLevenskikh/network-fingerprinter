import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { mapPacketEntityIpLayerToView } from '../Ip/PacketEntityIpLayerToView';
import { IPacketViewUdp } from '../../../DAL/Packet/Udp/IPacketViewUdp';
import { mapPacketEntityUdpLayerToView } from './PacketEntityUdpLayerToView';

export function mapPacketEntityToUdpPacketView(entity: IPacketEntity): IPacketViewUdp {
    const { layers: { eth, frame, ip, udp } } = entity;

    return {
        ip: mapPacketEntityIpLayerToView(ip),
        udp: mapPacketEntityUdpLayerToView(udp),
    };
}
