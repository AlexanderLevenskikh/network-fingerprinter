import { ITlsFingerprint } from '../Fingerprint/ITlsFingerprint';

export interface ITlsSignature {
    md5hash: string;
    fingerprint: ITlsFingerprint;
}
