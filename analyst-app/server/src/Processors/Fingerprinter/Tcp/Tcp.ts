import { IPacketViewTcp } from '../../../DAL/Packet/Tcp/IPacketViewTcp';
import { ITcpFingerprint } from './Fingerprint/ITcpFingerprint';

export enum FingerprinterPacketType {
    Syn,
    SynAck,
}

export function tcpFingerprintProcessor(
    packet: IPacketViewTcp,
    type: FingerprinterPacketType,
): ITcpFingerprint {

}
