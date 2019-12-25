import { ITcpStreamFingerprint } from './ITcpStreamFingerprint';
import { TcpStreamViewApplicationProtocol } from './TcpStreamViewApplicationProtocol';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';
import { Nullable } from '../../../Shared/Types/Nullable';

export interface ITcpStreamView
    extends
        ITcpStreamFingerprint,
        ITcpStreamMetaData {
    streamId: number;
    packetsCount: number; // aggregation (_docs count)
    sourceIp: string; // From tcp SYN
    sourcePort: number; // From tcp SYN
    sourceMac: string; // From tcp SYN
    destinationIp: string; // From tcp SYN
    destinationPort: number; // From tcp SYN
    destinationMac: string; // From tcp SYN
    applicationLayerProtocol: Nullable<TcpStreamViewApplicationProtocol>; // From tcp SYN (frame_protocols)
    // sensorId: number; // Add metadata to sensor output
}
