import { Nullable } from '../../../Shared/Types/Nullable';

export interface IPacketViewUdpLayer {
    streamId: string;
    sourcePort: Nullable<number>;
    destinationPort: number;
}
