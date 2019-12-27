import { PacketViewHttpVersion } from './PacketViewHttpVersion';
import { IPacketViewHttpHeader } from './IPacketViewHttpHeader';
import { PacketViewHttpType } from './PacketViewHttpType';

export interface IPacketViewHttpLayer {
    type: PacketViewHttpType;
    version: PacketViewHttpVersion;
    headers: IPacketViewHttpHeader[];
}
