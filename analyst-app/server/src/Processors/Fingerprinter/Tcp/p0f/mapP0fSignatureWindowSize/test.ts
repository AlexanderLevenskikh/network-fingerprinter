import { mapP0fSignatureWindowSize } from './mapP0fSignatureWindowSize';
import { TcpSignatureWindowSizeValueType } from '../../Signature/TcpSignatureWindowSizeValueType';

describe('mapP0fSignatureWindowSize', () => {
    it('exact', () => {
        const wsize = '8912';

        const result = mapP0fSignatureWindowSize(wsize);
        expect(result.value).toEqual(8912);
        expect(result.valueType).toEqual(TcpSignatureWindowSizeValueType.Exact);
    });

    it('multiple by mss', () => {
        const wsize = 'mss*8';

        const result = mapP0fSignatureWindowSize(wsize);
        expect(result.value).toEqual(8);
        expect(result.valueType).toEqual(TcpSignatureWindowSizeValueType.MultipliedByMss);
    });
});
