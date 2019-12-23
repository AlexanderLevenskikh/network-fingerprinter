import { ITcpStreamHandshakePackets } from './ITcpStreamHandshakePackets';
import { ITcpStreamFingerprint } from './ITcpStreamFingerprint';
import { TcpStreamViewApplicationProtocols } from './TcpStreamViewApplicationProtocols';

export interface ITcpStreamView
    extends
        ITcpStreamHandshakePackets,
        ITcpStreamFingerprint
{
    streamId: number;
    /*startDateTime: string;
    endDateTime: string;
    packetsCount: number;
    sourceIp: string;
    sourcePort: number;
    sourceMac: string;
    destinationIp: string;
    destinationPort: number;
    destinationMac: string;
    sensorId: number;
    applicationLayerProtocols: TcpStreamViewApplicationProtocols[];*/

}
