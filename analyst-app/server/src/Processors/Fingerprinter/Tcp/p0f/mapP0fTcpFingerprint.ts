import { ITcpFingerprint } from '../Fingerprint/ITcpFingerprint';
import { FingerprintType } from '../Fingerprint/FingerprintType';
import { FingerprintClass } from '../Fingerprint/FingerprintClass';

export function mapP0fTcpFingerprint(fingerprint: string): ITcpFingerprint {
    const [
        labelType, labelClass, labelName, labelFlavour,
    ] = fingerprint.split(':');

    const fingerprintType = labelType === 's' ? FingerprintType.Specific : FingerprintType.Generic;

    let fingerprintClass = FingerprintClass.Other;
    if (labelClass === 'unix') {
        fingerprintClass = FingerprintClass.Unix;
    } else if (labelClass === 'win') {
        fingerprintClass = FingerprintClass.Windows;
    }
    return  {
        type: fingerprintType,
        class: fingerprintClass,
        name: labelName,
        flavour: labelFlavour,
    }
}
