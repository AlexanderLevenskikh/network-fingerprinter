import { IPacketViewHttp } from '../../../DAL/Packet/Http/IPacketViewHttp';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IHttpFingerprint } from './Fingerprint/IHttpFingerprint';


export enum HttpFingerprintProcessorPacketType {
    Syn,
    SynAck,
}

export function httpFingerprintProcessor(
    packet: IPacketViewHttp,
    type: HttpFingerprintProcessorPacketType,
): Nullable<IHttpFingerprint> {

}
