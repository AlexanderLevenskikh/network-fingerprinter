import { mapP0fSignatureInitialTtl } from './index';
import { TcpSignatureInitialTtlMatchType } from '../../Signature/TcpSignatureInitialTtlMatchType';

describe('mapP0fSignatureInitialTtl', () => {
    it('exact value', () => {
        const ittl = '64';
        const initialTtl = mapP0fSignatureInitialTtl(ittl);

        expect(initialTtl.value).toEqual(64);
        expect(initialTtl.match).toEqual(TcpSignatureInitialTtlMatchType.Exact);
    });

    it('less or equal', () => {
        const ittl = '64-';
        const initialTtl = mapP0fSignatureInitialTtl(ittl);

        expect(initialTtl.value).toEqual(64);
        expect(initialTtl.match).toEqual(TcpSignatureInitialTtlMatchType.LessOrEqual);
    });
});
