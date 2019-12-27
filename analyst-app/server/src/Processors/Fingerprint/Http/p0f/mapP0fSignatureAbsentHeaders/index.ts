import { PacketViewHttpHeaderName } from '../../../../../DAL/Packet/Http/PacketViewHttpHeaderName';
import { mapHttpTextHeaderNameToView } from '../../../../../Mappers/Packet/Http/HttpTextHeaderNameToView';

export function mapP0fSignatureAbsentHeaders(habsent: string): PacketViewHttpHeaderName[] {
    if (!habsent) {
        return [];
    }

    return habsent
        .split(',')
        .map(mapHttpTextHeaderNameToView)
}
