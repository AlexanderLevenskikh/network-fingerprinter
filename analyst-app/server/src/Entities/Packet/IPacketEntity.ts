import { IPacketEntityLayers } from './IPacketEntityLayers';

export interface IPacketEntity {
    timestamp: string;
    streamId: string;
    sensorId: string;
    layers: IPacketEntityLayers;
}
