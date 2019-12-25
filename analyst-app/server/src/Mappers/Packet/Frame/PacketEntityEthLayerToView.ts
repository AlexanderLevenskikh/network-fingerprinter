import { IPacketEntityFrame } from '../../../Entities/Packet/IPacketEntityFrame';
import { IPacketViewFrame } from '../../../DAL/Packet/Frame/IPacketViewEthLayer';

export function mapPacketEntityFrameToView(entity: IPacketEntityFrame): IPacketViewFrame {
    const { frame_frame_protocols } = entity;

    return {
        protocolsInFrame: frame_frame_protocols.split(':'),
    };
}
