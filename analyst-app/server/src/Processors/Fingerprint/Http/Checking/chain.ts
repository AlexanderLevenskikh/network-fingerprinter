import { IPacketViewHttp } from '../../../../DAL/Packet/Http/IPacketViewHttp';
import { IHttpSignature } from '../Signature/IHttpSignature';
import { httpSignatureCheckVersion } from './httpSignatureCheckVersion';
import { httpSignatureOrderedHeaders } from './httpSignatureCheckOrderedHeaders';
import { httpSignatureAbsentHeaders } from './httpSignatureCheckAbsentHeaders';
import { httpSignatureCheckExpectedUserAgentOrServer } from './httpSignatureCheckExpectedUserAgentOrServer';

type HttpChecking = (packet: IPacketViewHttp, signature: IHttpSignature) => boolean;

export const httpSignatureCheckingChain: HttpChecking[] = [
    httpSignatureCheckVersion,
    httpSignatureOrderedHeaders,
    httpSignatureAbsentHeaders,
    httpSignatureCheckExpectedUserAgentOrServer,
];
