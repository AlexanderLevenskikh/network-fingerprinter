import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { mapPacketEntityTlsLayerToView } from './PacketEntityTlsLayerToView';
import { IPacketViewTls } from '../../../DAL/Packet/Tls/IPacketViewTls';
import { mapPacketEntityToTcpPacketView } from '../Tcp/PacketEntityToView';

export function mapPacketEntityToTlsPacketView(entity: IPacketEntity): IPacketViewTls {
    const { layers: { tls } } = entity;

    return {
        ...mapPacketEntityToTcpPacketView(entity),
        tls: mapPacketEntityTlsLayerToView(tls),
    };
}
