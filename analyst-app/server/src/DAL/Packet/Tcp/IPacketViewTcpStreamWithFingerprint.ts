import { IPacketViewTcpHandshakeGroup } from './IPacketViewTcpHandshakeGroup';

export interface IPacketViewTcpStreamWithFingerprint extends IPacketViewTcpHandshakeGroup {
    os: string;
}
