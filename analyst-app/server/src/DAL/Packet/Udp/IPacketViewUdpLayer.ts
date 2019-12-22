import { Nullable } from '../../../Shared/Types/Nullable';

export interface IPacketViewUdpLayer {
    streamId: number;
    sourcePort: Nullable<number>;
    destinationPort: number;
}
