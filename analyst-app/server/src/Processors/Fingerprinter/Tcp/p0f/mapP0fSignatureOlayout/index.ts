import { TcpSignatureTcpOptionType } from '../../Signature/TcpSignatureTcpOptionType';
import { ITcpSignatureTcpOption } from '../../Signature/ITcpSignatureTcpOption';

export function mapP0fSignatureOlayout(olayout: string): ITcpSignatureTcpOption[] {
    if (!olayout) {
        return [];
    }

    const olayoutArray = olayout.split(',');

    return olayoutArray.map(item => {
        const eolMatch = item.match(/^eol\+(\d+)$/);
        const optionsMap = {
            mss: TcpSignatureTcpOptionType.mss,
            nop: TcpSignatureTcpOptionType.nop,
            sack: TcpSignatureTcpOptionType.sack,
            sok: TcpSignatureTcpOptionType.sok,
            ts: TcpSignatureTcpOptionType.ts,
            unknown: TcpSignatureTcpOptionType.unknown,
            ws: TcpSignatureTcpOptionType.ws,
        };

        if (eolMatch) {
            return {
                type: TcpSignatureTcpOptionType.eol,
                payload: Number.parseInt(eolMatch[1], 10),
            }
        }

        return {
            type: optionsMap[item],
        }
    });
}
