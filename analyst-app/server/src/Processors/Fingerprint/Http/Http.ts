import { IPacketViewHttp } from '../../../DAL/Packet/Http/IPacketViewHttp';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IHttpFingerprint } from './Fingerprint/IHttpFingerprint';
import { httpRequestSignatures } from './Signature/Data/Request';
import { httpResponseSignatures } from './Signature/Data/Response';
import { httpSignatureCheckingChain } from './Checking/chain';

export enum HttpFingerprintProcessorPacketType {
    Request,
    Response,
}

export function httpFingerprintProcessor(
    packet: IPacketViewHttp,
    type: HttpFingerprintProcessorPacketType,
): Nullable<IHttpFingerprint> {
    const signatures = type === HttpFingerprintProcessorPacketType.Request
        ? httpRequestSignatures
        : httpResponseSignatures;
    const signatureMatch = signatures.find(signature => {
        return httpSignatureCheckingChain.every(check => check(packet, signature));
    });

    return signatureMatch ? signatureMatch.fingerprint : null;

}
