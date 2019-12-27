import { mapP0fSignatureOlayout } from './index';
import { ITcpSignatureTcpOption } from '../../Signature/ITcpSignatureTcpOption';
import { PacketViewTcpOptionType } from '../../../../../DAL/Packet/Tcp/PacketViewTcpOptionType';

describe('mapP0fSignatureOlayout', () => {
    it('options list', () => {
        const olayoutStr = 'ws,nop,mss,sok,nop,nop';

        const olayout = mapP0fSignatureOlayout(olayoutStr);

        const expectedResult: ITcpSignatureTcpOption[] = [
            { type: PacketViewTcpOptionType.ws },
            { type: PacketViewTcpOptionType.nop },
            { type: PacketViewTcpOptionType.mss },
            { type: PacketViewTcpOptionType.sok },
            { type: PacketViewTcpOptionType.nop },
            { type: PacketViewTcpOptionType.nop },
        ];
        expect(olayout).toEqual(expectedResult);
    });

    it('options list with eol', () => {
        const olayoutStr = 'mss,ws,sok,nop,eol+13';

        const olayout = mapP0fSignatureOlayout(olayoutStr);

        const expectedResult: ITcpSignatureTcpOption[] = [
            { type: PacketViewTcpOptionType.mss },
            { type: PacketViewTcpOptionType.ws },
            { type: PacketViewTcpOptionType.sok },
            { type: PacketViewTcpOptionType.nop },
            { type: PacketViewTcpOptionType.eol, payload: 13 },
        ];
        expect(olayout).toEqual(expectedResult);
    });

    it('empty options list', () => {
        const olayoutStr = '';

        const olayout = mapP0fSignatureOlayout(olayoutStr);

        const expectedResult: ITcpSignatureTcpOption[] = [];
        expect(olayout).toEqual(expectedResult);
    });
});
