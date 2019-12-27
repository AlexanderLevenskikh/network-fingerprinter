import { ITcpSignatureTcpOption } from '../../Signature/ITcpSignatureTcpOption';
import { PacketViewTcpOptionType } from '../../../../../DAL/Packet/Tcp/PacketViewTcpOptionType';

export function mapP0fSignatureOlayout(olayout: string): ITcpSignatureTcpOption[] {
    if (!olayout) {
        return [];
    }

    const olayoutArray = olayout.split(',');

    return olayoutArray.map(item => {
        const eolMatch = item.match(/^eol\+(\d+)$/);
        const optionsMap = {
            mss: PacketViewTcpOptionType.mss,
            nop: PacketViewTcpOptionType.nop,
            sack: PacketViewTcpOptionType.sack,
            sok: PacketViewTcpOptionType.sok,
            ts: PacketViewTcpOptionType.ts,
            unknown: PacketViewTcpOptionType.unknown,
            ws: PacketViewTcpOptionType.ws,
        };

        if (eolMatch) {
            return {
                type: PacketViewTcpOptionType.eol,
                payload: Number.parseInt(eolMatch[1], 10),
            }
        }

        return {
            type: optionsMap[item],
        }
    });
}
