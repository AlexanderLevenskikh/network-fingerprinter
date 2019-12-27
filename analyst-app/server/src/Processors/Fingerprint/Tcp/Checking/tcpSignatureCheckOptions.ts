import { ITcpSignature } from '../Signature/ITcpSignature';
import { IPacketViewTcp } from '../../../../DAL/Packet/Tcp/IPacketViewTcp';

export function tcpSignatureCheckOptions(packet: IPacketViewTcp, signature: ITcpSignature): boolean {
    const { tcpOptions: signatureOptions } = signature;
    const { tcpOptions: packetOptions } = packet.tcp;

    if (signatureOptions.length !== packetOptions.length) {
        return false;
    }

    // If payload is not primitive, checking fails
    return signatureOptions.every((signatureOption, index) => {
        return (
            signatureOption.type === packetOptions[index].type
            && (!signatureOption.payload || signatureOption.payload === packetOptions[index].payload)
        )
    });
}
