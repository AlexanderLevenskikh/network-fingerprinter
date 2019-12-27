import { IPacketViewHttp } from '../../../../DAL/Packet/Http/IPacketViewHttp';
import { IHttpSignature } from '../Signature/IHttpSignature';
import { PacketViewHttpHeaderName } from '../../../../DAL/Packet/Http/PacketViewHttpHeaderName';

export function httpSignatureCheckExpectedUserAgentOrServer(packet: IPacketViewHttp, signature: IHttpSignature): boolean {
    if (!signature.expectedUserAgentOrServerSubstring) {
        return true;
    }

    const userAgentOrServerHeader = packet.http.headers.find(
        x => x.name === PacketViewHttpHeaderName.UserAgent || x.name === PacketViewHttpHeaderName.Server,
    );

    if (!userAgentOrServerHeader || !userAgentOrServerHeader.value) {
        return false;
    }

    return userAgentOrServerHeader.value.includes(signature.expectedUserAgentOrServerSubstring);
}
