import { IPacketViewTcp } from '../Tcp/IPacketViewTcp';
import { IPacketViewTlsLayer } from './IPacketViewTlsLayer';

export interface IPacketViewTls extends IPacketViewTcp {
    tls: IPacketViewTlsLayer;
}
