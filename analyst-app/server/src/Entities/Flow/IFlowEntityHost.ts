import { IFlowEntityOs } from './IFlowEntityOs';

export interface IFlowEntityHost {
    hostname: string;
    os: IFlowEntityOs;
    containerized: boolean;
    name: string;
    id: string;
    architecture: string;
}
