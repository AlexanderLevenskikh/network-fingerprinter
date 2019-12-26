import { PacketViewHttpVersion } from '../../../../DAL/Packet/Http/PacketViewHttpVersion';
import { PacketViewHttpHeaderName } from '../../../../DAL/Packet/Http/PacketViewHttpHeaderName';
import { IHttpSignatureHeader } from './IHttpSignatureHeader';
import { IHttpFingerprint } from '../Fingerprint/IHttpFingerprint';

export interface IHttpSignature {
    version: PacketViewHttpVersion;
    orderedHeaders: IHttpSignatureHeader[];
    absentHeaders: PacketViewHttpHeaderName[];
    expectedUserAgentOrServerSubstring?: string;
    fingerprint: IHttpFingerprint;
}
