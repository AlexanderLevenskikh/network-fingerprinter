import { TcpPacketViewIpVersion } from './TcpPacketViewIpVersion';
import { ITcpPacketViewIpFlags } from './ITcpPacketViewIpFlags';
import { Nullable } from '../../../Shared/Types/Nullable';

export interface ITcpPacketIpDataView {
    version: TcpPacketViewIpVersion;
    ttl: Nullable<number>;
    identifier: number;
    ipFlags: ITcpPacketViewIpFlags;
    ecn: boolean;
}
