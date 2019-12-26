import { PacketViewHttpVersion } from './PacketViewHttpVersion';
import { IPacketViewHttpHeader } from './IPacketViewHttpHeader';

export interface IPacketViewHttpLayer {
    version: PacketViewHttpVersion;
    host: string;
    headers: IPacketViewHttpHeader[];
}
