import { IFlowEntity } from '../../Entities/Flow/IFlowEntity';
import { IFlowView } from '../../DAL/Flow/IFlowView';
import { mapFlowProtocolNumberToEnum } from './FlowProtocolNumberToEnum';
import { mapFlowToTcpControlBits } from './FlowToTcpControlBits';

export function mapFlowEntityToView(entity: IFlowEntity): IFlowView {
    const { netflow } = entity;
    const {
        protocol_identifier,
        source_ipv4_address, destination_ipv4_address,
        source_transport_port, destination_transport_port, tcp_control_bits,
    } = netflow;

    return {
        source: {
            ip: source_ipv4_address,
            port: source_transport_port,
        },
        destination: {
            ip: destination_ipv4_address,
            port: destination_transport_port,
        },
        protocol: mapFlowProtocolNumberToEnum(protocol_identifier),
        tcpControlBits: mapFlowToTcpControlBits(tcp_control_bits),
    };
}
