import { IPacketViewTcp } from '../../../DAL/Packet/Tcp/IPacketViewTcp';
import { ITcpFingerprint } from './Fingerprint/ITcpFingerprint';
import { synSignatures } from './Signature/Data/Syn';
import { synAckSignatures } from './Signature/Data/SynAck';
import { TcpSignatureIpVersion } from './Signature/TcpSignatureIpVersion';
import { PacketViewIpVersion } from '../../../DAL/Packet/Ip/PacketViewIpVersion';
import { TcpSignatureInitialTtlMatchType } from './Signature/TcpSignatureInitialTtlMatchType';
import { TcpSignatureWindowSizeValueType } from './Signature/TcpSignatureWindowSizeValueType';
import { TcpSignatureQuirks } from './Signature/TcpSignatureQuirks';
import { isEmpty } from '../../../Shared/Utils/isEmpty';
import { Nullable } from '../../../Shared/Types/Nullable';

export enum FingerprinterPacketType {
    Syn,
    SynAck,
}

export function tcpFingerprintProcessor(
    packet: IPacketViewTcp,
    type: FingerprinterPacketType,
): Nullable<ITcpFingerprint> {
    const signatures = type === FingerprinterPacketType.Syn ? synSignatures : synAckSignatures;
    const signatureMatch = signatures.find(signature => {
        const checks = [
            () => {
                switch (signature.ipVersion) {
                    case TcpSignatureIpVersion.Ipv4:
                        return packet.ip.version === PacketViewIpVersion.IPv6;
                    case TcpSignatureIpVersion.Ipv6:
                        return packet.ip.version === PacketViewIpVersion.IPv6;
                    default:
                        return true;
                }
            },
            () => {
                const { value, match } = signature.initialTtl;
                const isExact = match === TcpSignatureInitialTtlMatchType.Exact;
                const { ttl } = packet.ip;

                return isExact ? ttl === value : ttl <= value;
            },
            () => {
                const { valueType, value } = signature.windowSize;
                const isExact = valueType === TcpSignatureWindowSizeValueType.Exact;
                const { windowSize, maximumSegmentSize } = packet.tcp;

                return isExact ? windowSize === value : maximumSegmentSize * value === windowSize;
            },
            () => signature.scalingFactor ? signature.scalingFactor === packet.tcp.windowScalingFactor : true,
            // TODO TcpOptions
            () => {
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
            },
        ];

        return checks.every(check => check());
    });

    return signatureMatch ? signatureMatch.fingerprint : null;
}
