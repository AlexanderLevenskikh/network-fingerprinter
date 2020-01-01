import { TcpStreamViewApplicationProtocol } from './TcpStreamViewApplicationProtocol';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IFingerprints } from '../../../Processors/Fingerprint/IFingerprints';

export interface ITcpStreamView extends ITcpStreamMetaData {
    streamId: string;
    packetsCount: number; // aggregation (_docs count)
    sourceIp: string; // From tcp SYN
    sourcePort: number; // From tcp SYN
    sourceMac: string; // From tcp SYN
    sourceFingerprints: IFingerprints;
    destinationIp: string; // From tcp SYN
    destinationPort: number; // From tcp SYN
    destinationMac: string; // From tcp SYN
    destinationFingerprints: IFingerprints;
    applicationLayerProtocol: Nullable<TcpStreamViewApplicationProtocol>; // From tcp SYN (frame_protocols)
    serverNameIndication?: string; // from TLS
    // sensorId: number; // Add metadata to sensor output
}
