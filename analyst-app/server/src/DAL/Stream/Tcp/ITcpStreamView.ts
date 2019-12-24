import { ITcpStreamHandshakePackets } from './ITcpStreamHandshakePackets';
import { ITcpStreamFingerprint } from './ITcpStreamFingerprint';
import { TcpStreamViewApplicationProtocols } from './TcpStreamViewApplicationProtocols';

export interface ITcpStreamView
    extends
        ITcpStreamHandshakePackets,
        ITcpStreamFingerprint
{
    streamId: number;
    /*startDateTime: string; // add custom mapping to elastic
    endDateTime: string; // add custom mapping to elastic
    packetsCount: number; // aggregation (_docs count)
    sourceIp: string; // From tcp SYN
    sourcePort: number; // From tcp SYN
    sourceMac: string; // From tcp SYN
    destinationIp: string; // From tcp SYN
    destinationPort: number; // From tcp SYN
    destinationMac: string; // From tcp SYN
    sensorId: number; // Add metadata to sensor output
    applicationLayerProtocols: TcpStreamViewApplicationProtocols[]; // From tcp SYN (frame_protocols)
    */

}
