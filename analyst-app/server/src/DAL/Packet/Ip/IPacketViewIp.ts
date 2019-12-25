import { IPacketViewIpLayer } from './IPacketViewIpLayer';
import { IPacketViewEthLayer } from '../Eth/IPacketViewEthLayer';
import { IPacketViewFrame } from '../Frame/IPacketViewEthLayer';

export interface IPacketViewIp {
    frame: IPacketViewFrame;
    eth: IPacketViewEthLayer;
    ip: IPacketViewIpLayer;
}
