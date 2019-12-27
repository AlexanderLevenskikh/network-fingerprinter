import { IPacketEntity } from '../../../Entities/Packet/IPacketEntity';
import { IPacketViewHttp } from '../../../DAL/Packet/Http/IPacketViewHttp';
import { mapPacketEntityHttpLayerToView } from './PacketEntityHttpLayerToView';
import { mapPacketEntityToTcpPacketView } from '../Tcp/PacketEntityToView';

export function mapPacketEntityToHttpPacketView(entity: IPacketEntity): IPacketViewHttp {
    const { layers: { http } } = entity;

    return {
        ...mapPacketEntityToTcpPacketView(entity),
        http: mapPacketEntityHttpLayerToView(http),
    };
}
