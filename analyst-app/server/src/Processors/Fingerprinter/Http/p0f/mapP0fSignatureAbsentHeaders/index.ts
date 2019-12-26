import { PacketViewHttpHeaderName } from '../../../../../DAL/Packet/Http/PacketViewHttpHeaderName';
import { httpSignatureHeaderNameMap } from '../mapP0fSignatureHeaders/map';

export function mapP0fSignatureAbsentHeaders(habsent: string): PacketViewHttpHeaderName[] {
    if (!habsent) {
        return [];
    }

    return habsent
        .split(',')
        .map(header => httpSignatureHeaderNameMap[ header ] || PacketViewHttpHeaderName.Unknown)
}
