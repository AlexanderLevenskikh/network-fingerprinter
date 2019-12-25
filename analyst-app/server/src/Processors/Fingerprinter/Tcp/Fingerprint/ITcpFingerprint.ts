import { FingerprintType } from './FingerprintType';
import { FingerprintClass } from './FingerprintClass';

export interface ITcpFingerprint {
    type: FingerprintType;
    class: FingerprintClass;
    name: string;
    flavour: string;
}
