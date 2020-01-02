import { IPacketEntityLayers } from './IPacketEntityLayers';

export interface IPacketEntity {
    timestamp: string;
    streamId: string;
    layers: IPacketEntityLayers;
}
