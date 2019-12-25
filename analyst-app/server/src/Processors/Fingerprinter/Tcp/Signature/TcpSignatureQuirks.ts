export enum TcpSignatureQuirks {
    dontFragment,
    dontFragmentSetButIpIdIsNonZero,
    dontFragmentNotSetButIpIdIsZero,
    ecnSupport,
    mustBeZeroFieldIsNotZero,
    flowIdIsNotZero,
    sequenceNumberIsZero,
    ackNumberIsNonZeroAndFlagNotUsed,
    ackNumberIsZeroAndFlagUsed,
    urgPointerIsNonZeroAndFlagNotUsed,
    urgFlagUsed,
    pushFlagUsed,
    ownTimestampIsZero,
    nonZeroPeerTimestamp,
    nonZeroDataInOptionsSegment,
    excessiveWindowScalingFactor, // > 14
    malformedTcpOptions,
}
