import { ITcpFingerprint } from '../Fingerprint/ITcpFingerprint';
import { TcpFingerprintType } from '../Fingerprint/TcpFingerprintType';
import { TcpFingerprintClass } from '../Fingerprint/TcpFingerprintClass';

export function mapP0fTcpFingerprint(fingerprint: string): ITcpFingerprint {
    const [
        labelType, labelClass, labelName, labelFlavour,
    ] = fingerprint.split(':');

    const fingerprintType = labelType === 's' ? TcpFingerprintType.Specific : TcpFingerprintType.Generic;

    let fingerprintClass = TcpFingerprintClass.Other;
    if (labelClass === 'unix') {
        fingerprintClass = TcpFingerprintClass.Unix;
    } else if (labelClass === 'win') {
        fingerprintClass = TcpFingerprintClass.Windows;
    }
    return  {
        type: fingerprintType,
        class: fingerprintClass,
        name: labelName,
        flavour: labelFlavour,
    }
}
