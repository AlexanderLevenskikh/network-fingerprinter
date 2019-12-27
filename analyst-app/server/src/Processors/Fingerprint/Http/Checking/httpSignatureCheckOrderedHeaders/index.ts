import { IPacketViewHttp } from '../../../../../DAL/Packet/Http/IPacketViewHttp';
import { IHttpSignature } from '../../Signature/IHttpSignature';

export function httpSignatureOrderedHeaders(packet: IPacketViewHttp, signature: IHttpSignature): boolean {

    const signatureHeadersMap = signature.orderedHeaders.reduce((map, current) => ({
        ...map,
        [ current.name ]: current,
    }), {});
    const packetHeadersMap = packet.http.headers.reduce((map, current) => ({
        ...map,
        [ current.name ]: current,
    }), {});

    const packetHeadersInSignature = packet
        .http.headers
        .filter(header => Boolean(signatureHeadersMap[header.name]));

    const areAllSignatureHeadersMatch = signature
        .orderedHeaders
        .every(signatureHeader => {
            const packetHeader = packetHeadersMap[signatureHeader.name];

            if (signatureHeader.isTransient && !packetHeader) {
                return true;
            }

            return packetHeader && (!signatureHeader.value || packetHeader.value.includes(signatureHeader.value));
        });

    if (!areAllSignatureHeadersMatch) {
        return false;
    }

    const signatureHeadersInPacket = signature
        .orderedHeaders
        .filter(header => Boolean(packetHeadersMap[header.name]));

    return signatureHeadersInPacket.length === packetHeadersInSignature.length
        && signatureHeadersInPacket
            .every(({ name }, index) => name === packetHeadersInSignature[index].name);

}
