import { ITcpStreamHandshakePackets } from './ITcpStreamHandshakePackets';
import { ITcpStreamFingerprint } from './ITcpStreamFingerprint';
import { TcpStreamViewApplicationProtocols } from './TcpStreamViewApplicationProtocols';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';

export interface ITcpStreamView
    extends
        ITcpStreamHandshakePackets,
        ITcpStreamFingerprint,
        ITcpStreamMetaData
{
    streamId: number;
    /*packetsCount: number; // aggregation (_docs count)
    sourceIp: string; // From tcp SYN
    sourcePort: number; // From tcp SYN
    sourceMac: string; // From tcp SYN
    destinationIp: string; // From tcp SYN
    destinationPort: number; // From tcp SYN
    destinationMac: string; // From tcp SYN
    applicationLayerProtocols: TcpStreamViewApplicationProtocols[]; // From tcp SYN (frame_protocols)
    sensorId: number; // Add metadata to sensor output
    */

}
