import { PacketViewTcpApplicationProtocol } from '../../Packet/Tcp/PacketViewTcpApplicationProtocol';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IFingerprintViewTcp } from '../../Fingerprint/Tcp/IFingerprintViewTcp';

export interface ITcpStreamView extends ITcpStreamMetaData {
    streamId: string;
    packetsCount: number;
    sourceIp: string;
    sourcePort: number;
    sourceMac: string;
    destinationIp: string;
    destinationPort: number;
    fingerprints: IFingerprintViewTcp;
    applicationLayerProtocols: PacketViewTcpApplicationProtocol[];
    serverNameIndication?: string;
    // sensorId: number; // Add metadata to sensor output
}
