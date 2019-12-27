import { TcpFingerprintType } from './TcpFingerprintType';
import { TcpFingerprintClass } from './TcpFingerprintClass';

export interface ITcpFingerprint {
    type: TcpFingerprintType;
    class: TcpFingerprintClass;
    name: string;
    flavour: string;
}
