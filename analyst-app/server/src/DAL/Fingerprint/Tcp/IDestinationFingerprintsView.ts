import { Nullable } from '../../../Shared/Types/Nullable';
import { ITcpFingerprint } from '../../../Processors/Fingerprint/Tcp/Fingerprint/ITcpFingerprint';
import { ITlsFingerprint } from '../../../Processors/Fingerprint/Tls/Fingerprint/ITlsFingerprint';
import { IHttpFingerprint } from '../../../Processors/Fingerprint/Http/Fingerprint/IHttpFingerprint';

export interface IDestinationFingerprintsView {
    tcp: Nullable<ITcpFingerprint>;
    http: Nullable<IHttpFingerprint>;
    isTcpUndefined: boolean;
    isHttpUndefined: boolean;
}
