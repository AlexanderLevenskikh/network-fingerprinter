import { IHttpFingerprint } from '../Fingerprint/IHttpFingerprint';
import { HttpFingerprintClass } from '../Fingerprint/HttpFingerprintClass';
import { HttpFingerprintType } from '../Fingerprint/HttpFingerprintType';

export function mapP0fFingerprint(fingerprint: string): IHttpFingerprint {
    const [
        labelType, labelClass, labelName, labelFlavour,
    ] = fingerprint.split(':');

    const fingerprintType = labelType === 's' ? HttpFingerprintType.Specific : HttpFingerprintType.Generic;

    let fingerprintClass = HttpFingerprintClass.Other;
    if (labelClass === 'unix') {
        fingerprintClass = HttpFingerprintClass.Unix;
    } else if (labelClass === 'win') {
        fingerprintClass = HttpFingerprintClass.Windows;
    }
    return  {
        type: fingerprintType,
        class: fingerprintClass,
        name: labelName,
        flavour: labelFlavour,
    }
}
