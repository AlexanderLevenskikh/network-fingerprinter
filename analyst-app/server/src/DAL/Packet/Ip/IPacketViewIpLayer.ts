import { PacketViewIpVersion } from './PacketViewIpVersion';
import { IPacketViewIpFlags } from './IPacketViewIpFlags';
import { Nullable } from '../../../Shared/Types/Nullable';

export interface IPacketViewIpLayer {
    version: PacketViewIpVersion;
    ttl: Nullable<number>;
    identifier: number;
    ipFlags: IPacketViewIpFlags;
    ecn: boolean;
}
