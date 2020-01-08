import { PacketViewTcpApplicationProtocol } from '../../Packet/Tcp/PacketViewTcpApplicationProtocol';
import { ITcpStreamMetaData } from './ITcpStreamMetaData';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IFingerprintViewTcp } from '../../Fingerprint/Tcp/IFingerprintViewTcp';

export interface ITcpStreamView extends ITcpStreamMetaData {
    streamId: string;
    sensorId: string;
    packetsCount: number;
    sourceMac: string;
    sourceIp: string;
    sourcePort: number;
    destinationMac: string;
    destinationIp: string;
    destinationPort: number;
    fingerprints: IFingerprintViewTcp;
    applicationLayerProtocols: PacketViewTcpApplicationProtocol[];
    serverNameIndication?: string;
    // sensorId: number; // Add metadata to sensor output
}
