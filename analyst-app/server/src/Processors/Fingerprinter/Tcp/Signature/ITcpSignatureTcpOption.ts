import { PacketViewTcpOptionType } from '../../../../DAL/Packet/Tcp/PacketViewTcpOptionType';

export interface ITcpSignatureTcpOption {
    type: PacketViewTcpOptionType;
    payload?: any;
}
