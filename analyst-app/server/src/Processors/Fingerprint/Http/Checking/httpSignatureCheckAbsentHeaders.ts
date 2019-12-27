import { IPacketViewHttp } from '../../../../DAL/Packet/Http/IPacketViewHttp';
import { IHttpSignature } from '../Signature/IHttpSignature';

export function httpSignatureAbsentHeaders(packet: IPacketViewHttp, signature: IHttpSignature): boolean {
    const packetHeadersMap = packet.http.headers.reduce((map, current) => ({
        ...map,
        [ current.name ]: true,
    }), {});

    return signature.absentHeaders
        .every(header => !packetHeadersMap[header]);
}
