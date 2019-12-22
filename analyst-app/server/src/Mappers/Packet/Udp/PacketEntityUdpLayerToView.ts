import { IPacketEntityUdp } from '../../../Entities/Packet/IPacketEntityUdp';
import { IPacketViewUdpLayer } from '../../../DAL/Packet/Udp/IPacketViewUdpLayer';
import { parseIntNullable } from '../../../Shared/Utils/parseIntNullable';

export function mapPacketEntityUdpLayerToView(entity: IPacketEntityUdp): IPacketViewUdpLayer {
    const { udp_udp_stream, udp_udp_srcport, udp_udp_dstport } = entity;

    return {
        streamId: Number.parseInt(udp_udp_stream, 10),
        sourcePort: parseIntNullable(udp_udp_srcport),
        destinationPort: Number.parseInt(udp_udp_dstport, 10),
    };
}
