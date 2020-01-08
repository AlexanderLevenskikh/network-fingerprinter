import { IPacketViewTcp } from '../../../DAL/Packet/Tcp/IPacketViewTcp';
import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { mapPacketEntityIpLayerToView } from '../Ip/PacketEntityIpLayerToView';
import { mapPacketEntityTcpLayerToView } from './PacketEntityTcpLayerToView';
import { mapPacketEntityEthLayerToView } from '../Eth/PacketEntityEthLayerToView';
import { mapPacketEntityFrameToView } from '../Frame/PacketEntityEthLayerToView';

export function mapPacketEntityToTcpPacketView(entity: IPacketEntity): IPacketViewTcp {
    const { layers: { eth, frame, ip, tcp }, streamId, sensorId } = entity;

    return {
        frame: mapPacketEntityFrameToView(frame),
        eth: mapPacketEntityEthLayerToView(eth),
        ip: mapPacketEntityIpLayerToView(ip),
        tcp: mapPacketEntityTcpLayerToView(streamId, sensorId, tcp),
    };
}
