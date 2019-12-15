import { IPacketEntityLayers } from './IPacketEntityLayers';

export interface IPacketEntity {
    timestamp: string;
    layers: IPacketEntityLayers;
}
