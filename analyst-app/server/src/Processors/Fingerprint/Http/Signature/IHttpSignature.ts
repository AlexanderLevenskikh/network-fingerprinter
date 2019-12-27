import { PacketViewHttpHeaderName } from '../../../../DAL/Packet/Http/PacketViewHttpHeaderName';
import { IHttpSignatureHeader } from './IHttpSignatureHeader';
import { IHttpFingerprint } from '../Fingerprint/IHttpFingerprint';
import { HttpSignatureVersion } from './HttpSignatureVersion';

export interface IHttpSignature {
    version: HttpSignatureVersion;
    orderedHeaders: IHttpSignatureHeader[];
    absentHeaders: PacketViewHttpHeaderName[];
    expectedUserAgentOrServerSubstring?: string;
    fingerprint: IHttpFingerprint;
}
