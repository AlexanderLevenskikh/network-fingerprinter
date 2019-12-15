import { IPacketEntityFrame } from './IPacketEntityFrame';
import { IPacketEntityEth } from './IPacketEntityEth';
import { IPacketEntityIp } from './IPacketEntityIp';
import { IPacketEntityTcp } from './IPacketEntityTcp';
import { IPacketEntitySsh } from './IPacketEntitySsh';

export interface IPacketEntityLayers {
    frame: IPacketEntityFrame;
    eth: IPacketEntityEth;
    ip: IPacketEntityIp;
    tcp: IPacketEntityTcp;
    ssh: IPacketEntitySsh;
}
