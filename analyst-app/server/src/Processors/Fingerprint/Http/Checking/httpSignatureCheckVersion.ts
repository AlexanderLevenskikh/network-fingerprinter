import { IPacketViewHttp } from '../../../../DAL/Packet/Http/IPacketViewHttp';
import { IHttpSignature } from '../Signature/IHttpSignature';
import { PacketViewHttpVersion } from '../../../../DAL/Packet/Http/PacketViewHttpVersion';
import { HttpSignatureVersion } from '../Signature/HttpSignatureVersion';

export function httpSignatureCheckVersion(packet: IPacketViewHttp, signature: IHttpSignature): boolean {
    switch (signature.version) {
        case HttpSignatureVersion.Http1_0:
            return packet.http.version === PacketViewHttpVersion.Http1_0;
        case HttpSignatureVersion.Http1_1:
            return packet.http.version === PacketViewHttpVersion.Http1_1;
        case HttpSignatureVersion.Any:
            return true;
    }
}
