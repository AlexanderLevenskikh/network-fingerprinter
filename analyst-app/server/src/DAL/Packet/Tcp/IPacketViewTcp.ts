import { IPacketViewIpLayer } from '../Ip/IPacketViewIpLayer';
import { IPacketViewTcpLayer } from './IPacketViewTcpLayer';

export interface IPacketViewTcp {
    ip: IPacketViewIpLayer;
    tcp: IPacketViewTcpLayer;
}
