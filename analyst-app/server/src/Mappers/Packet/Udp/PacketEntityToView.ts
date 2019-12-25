import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { mapPacketEntityIpLayerToView } from '../Ip/PacketEntityIpLayerToView';
import { IPacketViewUdp } from '../../../DAL/Packet/Udp/IPacketViewUdp';
import { mapPacketEntityUdpLayerToView } from './PacketEntityUdpLayerToView';
import { mapPacketEntityEthLayerToView } from '../Eth/PacketEntityEthLayerToView';
import { mapPacketEntityFrameToView } from '../Frame/PacketEntityEthLayerToView';

export function mapPacketEntityToUdpPacketView(entity: IPacketEntity): IPacketViewUdp {
    const { layers: { eth, frame, ip, udp } } = entity;

    return {
        frame: mapPacketEntityFrameToView(frame),
        eth: mapPacketEntityEthLayerToView(eth),
        ip: mapPacketEntityIpLayerToView(ip),
        udp: mapPacketEntityUdpLayerToView(udp),
    };
}
