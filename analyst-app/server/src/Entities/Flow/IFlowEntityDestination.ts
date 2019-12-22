import { IFlowEntityGeo } from './IFlowEntityGeo';
import { IFlowEntityAs } from './IFlowEntityAs';

export interface IFlowEntityDestination {
    geo: IFlowEntityGeo;
    as: IFlowEntityAs;
    port: number;
    ip: string;
    locality: string;
}
