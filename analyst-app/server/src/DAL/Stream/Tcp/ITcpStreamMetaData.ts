import { PacketViewTcpApplicationProtocol } from '../../Packet/Tcp/PacketViewTcpApplicationProtocol';

export interface ITcpStreamMetaData {
    startDateTime: string; // add custom mapping to elastic
    endDateTime: string; // add custom mapping to elastic
}
