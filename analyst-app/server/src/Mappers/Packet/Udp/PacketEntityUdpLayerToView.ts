import { IPacketEntityUdp } from '../../../Entities/Packet/IPacketEntityUdp';
import { IPacketViewUdpLayer } from '../../../DAL/Packet/Udp/IPacketViewUdpLayer';
import { parseIntNullable } from '../../../Shared/Utils/parseIntNullable';

export function mapPacketEntityUdpLayerToView(streamId: string, entity: IPacketEntityUdp): IPacketViewUdpLayer {
    const { udp_udp_srcport, udp_udp_dstport } = entity;

    return {
        streamId,
        sourcePort: parseIntNullable(udp_udp_srcport),
        destinationPort: Number.parseInt(udp_udp_dstport, 10),
    };
}
