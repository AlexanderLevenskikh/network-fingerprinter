import { PacketViewTcpOptionType } from './PacketViewTcpOptionType';

export interface IPacketViewTcpOption {
    type: PacketViewTcpOptionType;
    payload?: any;
}
