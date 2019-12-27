import { TlsFingerprint } from '../Fingerprint/TlsFingerprint';

export interface ITlsSignature {
    md5hash: string;
    fingerprint: TlsFingerprint;
}
