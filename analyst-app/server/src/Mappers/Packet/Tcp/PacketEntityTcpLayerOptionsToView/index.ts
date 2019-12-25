import { PacketViewTcpOptionType } from '../../../../DAL/Packet/Tcp/PacketViewTcpOptionType';
import { IPacketViewTcpOption } from '../../../../DAL/Packet/Tcp/IPacketViewTcpOption';

const optionsMap = {
    0: PacketViewTcpOptionType.eol,
    1: PacketViewTcpOptionType.nop,
    2: PacketViewTcpOptionType.mss,
    3: PacketViewTcpOptionType.ws,
    4: PacketViewTcpOptionType.sok,
    5: PacketViewTcpOptionType.sack,
    8: PacketViewTcpOptionType.ts,
};

export function mapPacketEntityTcpLayerOptionsToView(optionsStr: string): IPacketViewTcpOption[] {
    if (!optionsStr) {
        return [];
    }

    const bytes = optionsStr.split(':');
    let currentByteIndex = 0;
    let options = [];

    while (currentByteIndex < bytes.length) {
        const currentByte = bytes[currentByteIndex];
        const optionType = optionsMap[Number.parseInt(currentByte, 16)] || PacketViewTcpOptionType.unknown;
        let option: IPacketViewTcpOption = {
            type: optionType,
        };

        switch (optionType) {
            case PacketViewTcpOptionType.eol: {
                option = {
                    ...option,
                    payload: bytes.length - currentByteIndex - 1,
                };
                currentByteIndex = bytes.length;
                break;
            }

            case PacketViewTcpOptionType.nop: {
                currentByteIndex += 1;
                break;
            }

            default: {
                currentByteIndex += Number.parseInt(bytes[currentByteIndex + 1], 16);
                break;
            }
        }

        options = [
            ...options,
            option,
        ]
    }

    return options;

}
