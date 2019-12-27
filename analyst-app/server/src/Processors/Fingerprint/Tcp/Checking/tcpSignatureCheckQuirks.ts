import { ITcpSignature } from '../Signature/ITcpSignature';
import { IPacketViewTcp } from '../../../../DAL/Packet/Tcp/IPacketViewTcp';
import { TcpSignatureQuirks } from '../Signature/TcpSignatureQuirks';
import { isEmpty } from '../../../../Shared/Utils/isEmpty';

export function tcpSignatureCheckQuirks(packet: IPacketViewTcp, signature: ITcpSignature): boolean {
    const { quirks } = signature;
    const {
        ipFlags: { dontFragment, zeroBitIsZero },
        ecn,
        identifier,
    } = packet.ip;
    const {
        sequenceNumber,
        ackNumber,
        urgPointer,
        tcpFlags: { ack, push, urg },
        windowScalingFactor,
    } = packet.tcp;

    // TODO ownTimestampIsZero
    // TODO nonZeroPeerTimestamp (not used in p0f)
    // TODO nonZeroDataInOptionsSegment (not used in p0f)
    // TODO flowIdIsNotZero (not used in p0f)
    // TODO malformedTcpOptions (not used in p0f)
    return quirks.every(quirk => {
        switch (quirk) {
            case TcpSignatureQuirks.dontFragment:
                return dontFragment;
            case TcpSignatureQuirks.dontFragmentSetButIpIdIsNonZero:
                return dontFragment && identifier !== 0;
            case TcpSignatureQuirks.dontFragmentNotSetButIpIdIsZero:
                return !dontFragment && identifier === 0;
            case TcpSignatureQuirks.ecnSupport:
                return ecn;
            case TcpSignatureQuirks.mustBeZeroFieldIsNotZero:
                return !zeroBitIsZero;
            case TcpSignatureQuirks.sequenceNumberIsZero:
                return isEmpty(sequenceNumber);
            case TcpSignatureQuirks.ackNumberIsNonZeroAndFlagNotUsed:
                return ackNumber !== 0 && !ack;
            case TcpSignatureQuirks.ackNumberIsZeroAndFlagUsed:
                return isEmpty(ackNumber) && ack;
            case TcpSignatureQuirks.urgPointerIsNonZeroAndFlagNotUsed:
                return isEmpty(urgPointer) && !urg;
            case TcpSignatureQuirks.urgFlagUsed:
                return urg;
            case TcpSignatureQuirks.pushFlagUsed:
                return push;
            case TcpSignatureQuirks.excessiveWindowScalingFactor:
                return windowScalingFactor > 14;
            default:
                return true;
        }
    });
}
