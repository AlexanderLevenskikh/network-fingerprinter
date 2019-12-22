import { IPacketViewTcpLayer } from './IPacketViewTcpLayer';
import { IPacketViewIp } from '../Ip/IPacketViewIp';

export interface IPacketViewTcp extends IPacketViewIp {
    tcp: IPacketViewTcpLayer;
}
