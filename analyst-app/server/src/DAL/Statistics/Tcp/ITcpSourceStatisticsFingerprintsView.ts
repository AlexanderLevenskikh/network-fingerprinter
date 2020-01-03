import { ITcpFingerprint } from '../../../Processors/Fingerprint/Tcp/Fingerprint/ITcpFingerprint';
import { ITlsFingerprint } from '../../../Processors/Fingerprint/Tls/Fingerprint/ITlsFingerprint';

export interface ITcpSourceStatisticsFingerprintsView {
    tcp: ITcpFingerprint[];
    tls: ITlsFingerprint
}
