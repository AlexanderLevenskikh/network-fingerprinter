import { ITcpFingerprint } from './Tcp/Fingerprint/ITcpFingerprint';
import { IHttpFingerprint } from './Http/Fingerprint/IHttpFingerprint';

export interface IFingerprints {
    tcp?: ITcpFingerprint;
    http?: IHttpFingerprint;
}
