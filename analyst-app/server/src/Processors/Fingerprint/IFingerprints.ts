import { ITcpFingerprint } from './Tcp/Fingerprint/ITcpFingerprint';
import { IHttpFingerprint } from './Http/Fingerprint/IHttpFingerprint';
import { ITlsFingerprint } from './Tls/Fingerprint/ITlsFingerprint';

export interface IFingerprints {
    tcp?: ITcpFingerprint;
    tls?: ITlsFingerprint;
    http?: IHttpFingerprint;
}
