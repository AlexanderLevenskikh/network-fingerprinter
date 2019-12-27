import { HttpFingerprintType } from './HttpFingerprintType';
import { HttpFingerprintClass } from './HttpFingerprintClass';

export interface IHttpFingerprint {
    type: HttpFingerprintType;
    class: HttpFingerprintClass;
    name: string;
    flavour: string;
}
