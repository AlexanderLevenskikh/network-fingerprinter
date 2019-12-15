import { IFlowEntityAgent } from './IFlowEntityAgent';
import { IFlowEntityFlow } from './IFlowEntityFlow';
import { IFlowEntityEvent } from './IFlowEntityEvent';
import { IFlowEntityHost } from './IFlowEntityHost';
import { IFlowEntityService } from './IFlowEntityService';
import { IFlowEntityEcs } from './IFlowEntityEcs';
import { IFlowEntitySource } from './IFlowEntitySource';
import { IFlowEntityFileset } from './IFlowEntityFileset';
import { IFlowEntityNetwork } from './IFlowEntityNetwork';
import { IFlowEntityInput } from './IFlowEntityInput';
import { IFlowEntityObserver } from './IFlowEntityObserver';
import { IFlowEntityDestination } from './IFlowEntityDestination';
import { IFlowEntityNetflow } from './IFlowEntityNetflow';

export interface IFlowEntity {
    agent: IFlowEntityAgent;
    destination: IFlowEntityDestination;
    source: IFlowEntitySource;
    fileset: IFlowEntityFileset;
    network: IFlowEntityNetwork;
    input: IFlowEntityInput;
    observer: IFlowEntityObserver;
    netflow: IFlowEntityNetflow;
    '@timestamp': Date;
    ecs: IFlowEntityEcs;
    service: IFlowEntityService;
    host: IFlowEntityHost;
    event: IFlowEntityEvent;
    flow: IFlowEntityFlow;
}
