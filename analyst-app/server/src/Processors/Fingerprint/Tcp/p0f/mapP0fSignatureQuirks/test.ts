import { mapP0fSignatureQuirks } from './index';
import { TcpSignatureQuirks } from '../../Signature/TcpSignatureQuirks';

describe('mapP0fSignatureQuirks', () => {
    it('maximal quirks list', () => {
        const quirksStr = 'df,id+,ecn,0+,flow,seq-,ack+,uptr+,pushf+,ts1-,ts2+,opt+,exws,bad';

        const quirks = mapP0fSignatureQuirks(quirksStr);

        const expectedResult: TcpSignatureQuirks[] = [
            TcpSignatureQuirks.dontFragment,
            TcpSignatureQuirks.dontFragmentSetButIpIdIsNonZero,
            TcpSignatureQuirks.ecnSupport,
            TcpSignatureQuirks.mustBeZeroFieldIsNotZero,
            TcpSignatureQuirks.flowIdIsNotZero,
            TcpSignatureQuirks.sequenceNumberIsZero,
            TcpSignatureQuirks.ackNumberIsNonZeroAndFlagNotUsed,
            TcpSignatureQuirks.urgPointerIsNonZeroAndFlagNotUsed,
            TcpSignatureQuirks.pushFlagUsed,
            TcpSignatureQuirks.ownTimestampIsZero,
            TcpSignatureQuirks.nonZeroPeerTimestamp,
            TcpSignatureQuirks.nonZeroDataInOptionsSegment,
            TcpSignatureQuirks.excessiveWindowScalingFactor,
            TcpSignatureQuirks.malformedTcpOptions,
        ];
        expect(quirks).toEqual(expectedResult);
    });

    it('empty quirks list', () => {
        const quirksStr = '';

        const quirks = mapP0fSignatureQuirks(quirksStr);

        const expectedResult: TcpSignatureQuirks[] = [];
        expect(quirks).toEqual(expectedResult);
    });
});
