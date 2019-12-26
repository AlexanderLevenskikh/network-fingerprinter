import { IPacketViewTcp } from '../Tcp/IPacketViewTcp';
import { IPacketViewHttpLayer } from './IPacketViewHttpLayer';

export interface IPacketViewHttp extends IPacketViewTcp {
    http: IPacketViewHttpLayer;
}
