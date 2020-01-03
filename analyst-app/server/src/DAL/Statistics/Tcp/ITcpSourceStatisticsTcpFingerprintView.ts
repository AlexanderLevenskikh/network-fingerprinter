import { ITcpFingerprint } from '../../../Processors/Fingerprint/Tcp/Fingerprint/ITcpFingerprint';
import { ITlsFingerprint } from '../../../Processors/Fingerprint/Tls/Fingerprint/ITlsFingerprint';
import { ITcpSignature } from '../../../Processors/Fingerprint/Tcp/Signature/ITcpSignature';

export interface ITcpSourceStatisticsTcpFingerprintView {
    tcp: ITcpSignature;
    tls: ITlsFingerprint
}
