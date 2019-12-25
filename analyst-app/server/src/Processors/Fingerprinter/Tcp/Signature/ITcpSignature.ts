import { TcpSignatureIpVersion } from './TcpSignatureIpVersion';
import { ITcpSignatureInitialTtl } from './ITcpSignatureInitialTtl';
import { Nullable } from '../../../../Shared/Types/Nullable';
import { ITcpSignatureWindowSize } from './ITcpSignatureWindowSize';
import { ITcpSignatureTcpOption } from './ITcpSignatureTcpOption';
import { TcpSignatureQuirks } from './TcpSignatureQuirks';
import { ITcpFingerprint } from '../Fingerprint/ITcpFingerprint';

export interface ITcpSignature {
    ipVersion: TcpSignatureIpVersion;
    initialTtl: ITcpSignatureInitialTtl;
    mss: Nullable<number>; // null if mss should not be the part of signature
    windowSize: ITcpSignatureWindowSize;
    scalingFactor: Nullable<number>; // null for any
    tcpOptions: ITcpSignatureTcpOption[];
    quirks: TcpSignatureQuirks[];
    payloadIsNotZero?: boolean;
    fingerprint: ITcpFingerprint;
}
