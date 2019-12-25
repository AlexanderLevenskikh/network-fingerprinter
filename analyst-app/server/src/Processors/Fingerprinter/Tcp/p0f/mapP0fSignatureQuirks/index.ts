import { TcpSignatureQuirks } from '../../Signature/TcpSignatureQuirks';

export function mapP0fSignatureQuirks(quirks: string): TcpSignatureQuirks[] {
    if (!quirks) {
        return [];
    }

    const quirksArray = quirks.split(',');

    return quirksArray.map(quirk => {
        const quirksMap = {
            'df': TcpSignatureQuirks.dontFragment,
            'id+': TcpSignatureQuirks.dontFragmentSetButIpIdIsNonZero,
            'id-': TcpSignatureQuirks.dontFragmentNotSetButIpIdIsZero,
            'ecn': TcpSignatureQuirks.ecnSupport,
            '0+': TcpSignatureQuirks.mustBeZeroFieldIsNotZero,
            'flow': TcpSignatureQuirks.flowIdIsNotZero,
            'seq-': TcpSignatureQuirks.sequenceNumberIsZero,
            'ack+': TcpSignatureQuirks.ackNumberIsNonZeroAndFlagNotUsed,
            'ack-': TcpSignatureQuirks.ackNumberIsZeroAndFlagUsed,
            'uptr+': TcpSignatureQuirks.urgPointerIsNonZeroAndFlagNotUsed,
            'urgf+': TcpSignatureQuirks.urgFlagUsed,
            'pushf+': TcpSignatureQuirks.pushFlagUsed,
            'ts1-': TcpSignatureQuirks.ownTimestampIsZero,
            'ts2+': TcpSignatureQuirks.nonZeroPeerTimestamp,
            'opt+': TcpSignatureQuirks.nonZeroDataInOptionsSegment,
            'exws': TcpSignatureQuirks.excessiveWindowScalingFactor,
            'bad': TcpSignatureQuirks.malformedTcpOptions,
        };

        return quirksMap[quirk];
    });
}
