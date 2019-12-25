import { mapP0fSignatureOlayout } from './index';
import { ITcpSignatureTcpOption } from '../../Signature/ITcpSignatureTcpOption';
import { TcpSignatureTcpOptionType } from '../../Signature/TcpSignatureTcpOptionType';

describe('mapP0fSignatureOlayout', () => {
    it('options list', () => {
        const olayoutStr = 'ws,nop,mss,sok,nop,nop';

        const olayout = mapP0fSignatureOlayout(olayoutStr);

        const expectedResult: ITcpSignatureTcpOption[] = [
            { type: TcpSignatureTcpOptionType.ws },
            { type: TcpSignatureTcpOptionType.nop },
            { type: TcpSignatureTcpOptionType.mss },
            { type: TcpSignatureTcpOptionType.sok },
            { type: TcpSignatureTcpOptionType.nop },
            { type: TcpSignatureTcpOptionType.nop },
        ];
        expect(olayout).toEqual(expectedResult);
    });

    it('options list with eol', () => {
        const olayoutStr = 'mss,ws,sok,nop,eol+13';

        const olayout = mapP0fSignatureOlayout(olayoutStr);

        const expectedResult: ITcpSignatureTcpOption[] = [
            { type: TcpSignatureTcpOptionType.mss },
            { type: TcpSignatureTcpOptionType.ws },
            { type: TcpSignatureTcpOptionType.sok },
            { type: TcpSignatureTcpOptionType.nop },
            { type: TcpSignatureTcpOptionType.eol, payload: 13 },
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
