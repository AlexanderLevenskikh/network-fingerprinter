import { IPacketViewTcp } from '../../../DAL/Packet/Tcp/IPacketViewTcp';
import { ITcpFingerprint } from './Fingerprint/ITcpFingerprint';
import { synSignatures } from './Signature/Data/Syn';
import { synAckSignatures } from './Signature/Data/SynAck';
import { Nullable } from '../../../Shared/Types/Nullable';
import { tcpSignatureCheckingChain } from './Checking/chain';

export enum TcpFingerprintProcessorPacketType {
    Syn,
    SynAck,
}

export function tcpFingerprintProcessor(
    packet: IPacketViewTcp,
    type: TcpFingerprintProcessorPacketType,
): Nullable<ITcpFingerprint> {
    const signatures = type === TcpFingerprintProcessorPacketType.Syn ? synSignatures : synAckSignatures;
    const signatureMatch = signatures.find(signature => {
        return tcpSignatureCheckingChain.every(check => check(packet, signature));
    });

    return signatureMatch ? signatureMatch.fingerprint : null;
}
