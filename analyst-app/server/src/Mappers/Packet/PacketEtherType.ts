import { PacketViewEtherType } from '../../DAL/Packet/PacketViewEtherType';
import { IMap } from '../../Shared/Types/IMap';

const etherTypeMap: IMap<PacketViewEtherType> = {
    2054: PacketViewEtherType.Arp,
    2048: PacketViewEtherType.Ipv4,
    33024: PacketViewEtherType.VlanTagged,
    34525: PacketViewEtherType.Ipv6,
};

export function mapPacketEtherType(etherType: number): PacketViewEtherType {
    const mappedEtherType = etherTypeMap[ etherType ];

    if (!mappedEtherType) {
        return PacketViewEtherType.Unknown;
    }

    return mappedEtherType;
}
