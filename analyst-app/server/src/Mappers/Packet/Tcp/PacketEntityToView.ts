import { IPacketViewTcp } from '../../../DAL/Packet/Tcp/IPacketViewTcp';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { mapPacketEntityIpLayerToView } from '../Ip/PacketEntityIpLayerToView';
import { mapPacketEntityTcpLayerToView } from './PacketEntityTcpLayerToView';

export function mapPacketEntityToTcpPacketView(entity: IPacketEntity): IPacketViewTcp {
    const { layers: { eth, frame, ip, tcp } } = entity;

    return {
        ip: mapPacketEntityIpLayerToView(ip),
        tcp: mapPacketEntityTcpLayerToView(tcp),
    };
}
