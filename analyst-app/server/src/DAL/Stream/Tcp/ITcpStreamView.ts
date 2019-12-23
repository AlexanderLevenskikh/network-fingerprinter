import { ITcpStreamHandshakePackets } from './ITcpStreamHandshakePackets';
import { ITcpStreamFingerprint } from './ITcpStreamFingerprint';

export interface ITcpStreamView
    extends
        ITcpStreamHandshakePackets,
        ITcpStreamFingerprint
{
    streamId: number;
}
