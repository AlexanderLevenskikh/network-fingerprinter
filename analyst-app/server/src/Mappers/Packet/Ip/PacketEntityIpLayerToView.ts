import { IPacketEntityIp } from '../../../Entities/Packet/IPacketEntityIp';
import { IPacketViewIpLayer } from '../../../DAL/Packet/Ip/IPacketViewIpLayer';
import { PacketViewIpVersion } from '../../../DAL/Packet/Ip/PacketViewIpVersion';
import { parseIntNullable } from '../../../Shared/Utils/parseIntNullable';

export function mapPacketEntityIpLayerToView(entity: IPacketEntityIp): IPacketViewIpLayer {
    const {
        ip_ip_ttl, ip_ip_id, ip_dsfield_ip_dsfield_ecn,
        ip_flags_ip_flags_rb, ip_flags_ip_flags_df, ip_flags_ip_flags_mf,
        ip_ip_version,
    } = entity;
    const ttl = parseIntNullable(ip_ip_ttl);
    const identifier = Number.parseInt(ip_ip_id, 16);
    const ecn = ip_dsfield_ip_dsfield_ecn === '1';

    const zeroBit = ip_flags_ip_flags_rb === '1';
    const dontFragment = ip_flags_ip_flags_df === '1';
    const moreFragments = ip_flags_ip_flags_mf === '1';

    const version = ip_ip_version === '4' ? PacketViewIpVersion.IPv4 : PacketViewIpVersion.IPv6;

    return {
        version,
        ttl,
        identifier,
        ecn,
        ipFlags: {
            zeroBit,
            dontFragment,
            moreFragments,
        },
    }
}
