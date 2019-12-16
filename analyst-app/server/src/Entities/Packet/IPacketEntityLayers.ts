import { IPacketEntityFrame } from './IPacketEntityFrame';
import { IPacketEntityEth } from './IPacketEntityEth';
import { IPacketEntityIp } from './IPacketEntityIp';
import { IPacketEntityTcp } from './IPacketEntityTcp';
import { IPacketEntitySsh } from './IPacketEntitySsh';
import { IPacketEntityUdp } from './IPacketEntityUdp';
import { IPacketEntityDns } from './IPacketEntityDns';

export interface IPacketEntityLayers {
    frame: IPacketEntityFrame;
    eth: IPacketEntityEth;
    ip?: IPacketEntityIp;
    tcp?: IPacketEntityTcp;
    udp?: IPacketEntityUdp;
    dns?: IPacketEntityDns;
    ssh?: IPacketEntitySsh;
}
