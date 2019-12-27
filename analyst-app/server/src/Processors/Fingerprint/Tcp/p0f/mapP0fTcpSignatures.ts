import { IMap } from '../../../../Shared/Types/IMap';
import { ITcpSignature } from '../Signature/ITcpSignature';
import { mapP0fTcpFingerprint } from './mapP0fTcpFingerprint';
import { ITcpSignatureTcpOption } from '../Signature/ITcpSignatureTcpOption';
import { mapP0fSignatureQuirks } from './mapP0fSignatureQuirks';
import { mapP0fSignatureOlayout } from './mapP0fSignatureOlayout';
import { mapP0fSignatureIpVersion } from './mapP0fSignatureIpVersion';
import { mapP0fSignatureInitialTtl } from './mapP0fSignatureInitialTtl';
import { mapP0fSignatureWindowSize } from './mapP0fSignatureWindowSize/mapP0fSignatureWindowSize';

export function mapP0fTcpSignatures(p0fSignatures: IMap<string[]>): ITcpSignature[] {
    return Object.keys(p0fSignatures).reduce((result, label) => {
        const fingerprint = mapP0fTcpFingerprint(label);

        const signaturesStr = p0fSignatures[label]!;
        let intermediateResult: ITcpSignature[] = [ ...result ];

        signaturesStr.forEach(signatureStr => {
            const [
                ver, ittl, olen, mssStr, wsizeAndScale, olayoutStr, quirksStr, pclass,
            ] = signatureStr.split(':');
            const [ wsize, scale ] = wsizeAndScale.split(',');

            const ipVersion = mapP0fSignatureIpVersion(ver);
            const initialTtl = mapP0fSignatureInitialTtl(ittl);
            const windowSize = mapP0fSignatureWindowSize(wsize);
            const tcpOptions: ITcpSignatureTcpOption[] = mapP0fSignatureOlayout(olayoutStr);
            const quirks = mapP0fSignatureQuirks(quirksStr);
            const mss = mssStr !== '*' ? Number.parseInt(mssStr, 10) : null;
            const scalingFactor = scale !== '*' ? Number.parseInt(scale, 10) : null;

            const tcpSignature: ITcpSignature = {
               ipVersion,
               initialTtl,
               mss,
               windowSize,
               scalingFactor,
               tcpOptions,
               quirks,
               fingerprint,
            };

            intermediateResult = [
                ...intermediateResult,
                tcpSignature,
            ]
        });

        return intermediateResult;
    }, []);
}
