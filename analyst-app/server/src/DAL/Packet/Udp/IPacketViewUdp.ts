import { IPacketViewUdpLayer } from './IPacketViewUdpLayer';
import { IPacketViewIp } from '../Ip/IPacketViewIp';

export interface IPacketViewUdp extends IPacketViewIp {
    udp: IPacketViewUdpLayer;
}
