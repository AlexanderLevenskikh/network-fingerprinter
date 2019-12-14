import { IFlowSide } from './IFlowSide';
import { FlowProtocol } from './FlowProtocol';
import { FlowTcpControlBit } from './FlowTcpControlBit';

export interface IFlowView {
    source: IFlowSide;
    destination: IFlowSide;
    protocol: FlowProtocol;
    tcpControlBits: FlowTcpControlBit[];
}
