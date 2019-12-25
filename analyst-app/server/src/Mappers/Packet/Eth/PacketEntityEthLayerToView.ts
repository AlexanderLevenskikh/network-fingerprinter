import { IPacketEntityIp } from '../../../Entities/Packet/IPacketEntityIp';
import { IPacketViewIpLayer } from '../../../DAL/Packet/Ip/IPacketViewIpLayer';
import { PacketViewIpVersion } from '../../../DAL/Packet/Ip/PacketViewIpVersion';
import { parseIntNullable } from '../../../Shared/Utils/parseIntNullable';
import { IPacketEntityEth } from '../../../Entities/Packet/IPacketEntityEth';
import { IPacketViewEthLayer } from '../../../DAL/Packet/Eth/IPacketViewEthLayer';

export function mapPacketEntityEthLayerToView(entity: IPacketEntityEth): IPacketViewEthLayer {
    const { eth_dst_eth_addr, eth_src_eth_addr } = entity;

    return {
        sourceMac: eth_src_eth_addr,
        destinationMac: eth_dst_eth_addr,
    };
}
