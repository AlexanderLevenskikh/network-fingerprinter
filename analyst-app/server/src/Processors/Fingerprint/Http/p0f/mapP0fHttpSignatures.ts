import { IMap } from '../../../../Shared/Types/IMap';
import { IHttpSignature } from '../Signature/IHttpSignature';
import { mapP0fFingerprint } from './mapP0fFingerprint';
import { PacketViewHttpVersion } from '../../../../DAL/Packet/Http/PacketViewHttpVersion';
import { mapP0fSignatureHeaders } from './mapP0fSignatureHeaders';
import { mapP0fSignatureAbsentHeaders } from './mapP0fSignatureAbsentHeaders';
import { HttpSignatureVersion } from '../Signature/HttpSignatureVersion';

export function mapP0fHttpSignatures(p0fSIgnatures: IMap<string[]>): IHttpSignature[] {
    return Object.keys(p0fSIgnatures).reduce((result, label) => {
        const fingerprint = mapP0fFingerprint(label);
        const signaturesStr = p0fSIgnatures[ label ];

        let intermediateResult: IHttpSignature[] = [ ...result ];

        signaturesStr.forEach(signatureStr => {
            const [
                ver, horder, habsent, expsw,
            ] = signatureStr.split(':');

            // wildcard case
            let version = HttpSignatureVersion.Any;
            if (ver === '0') {
                version = HttpSignatureVersion.Http1_0;
            } else if (ver === '1') {
                version = HttpSignatureVersion.Http1_1;
            }

            const orderedHeaders = mapP0fSignatureHeaders(horder);
            const absentHeaders = mapP0fSignatureAbsentHeaders(habsent);

            const httpSignature: IHttpSignature = {
                version,
                orderedHeaders,
                absentHeaders,
                expectedUserAgentOrServerSubstring: expsw,
                fingerprint,
            };

            intermediateResult = [
                ...intermediateResult,
                httpSignature,
            ];

        });

        return intermediateResult;
    }, []);
}
