import { PacketViewEtherType } from './PacketViewEtherType';
import { PacketViewTransportLayerProto } from './PacketViewTransportLayerProto';
import { PacketViewApplicationLayerProto } from './PacketViewApplicationLayerProto';

export interface IPacketView {
    etherType: PacketViewEtherType;
    transportLayerProto: PacketViewTransportLayerProto;
    applicationLayerProto: PacketViewApplicationLayerProto;
}
