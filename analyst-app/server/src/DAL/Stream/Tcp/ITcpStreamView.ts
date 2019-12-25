import { TcpStreamViewApplicationProtocol } from './TcpStreamViewApplicationProtocol';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';
import { Nullable } from '../../../Shared/Types/Nullable';
import { ITcpFingerprint } from '../../../Processors/Fingerprinter/Tcp/Fingerprint/ITcpFingerprint';

export interface ITcpStreamView extends ITcpStreamMetaData {
    streamId: number;
    packetsCount: number; // aggregation (_docs count)
    sourceIp: string; // From tcp SYN
    sourcePort: number; // From tcp SYN
    sourceMac: string; // From tcp SYN
    sourceFingerprint: ITcpFingerprint;
    destinationIp: string; // From tcp SYN
    destinationPort: number; // From tcp SYN
    destinationMac: string; // From tcp SYN
    destinationFingerprint: ITcpFingerprint;
    applicationLayerProtocol: Nullable<TcpStreamViewApplicationProtocol>; // From tcp SYN (frame_protocols)
    // sensorId: number; // Add metadata to sensor output
}
