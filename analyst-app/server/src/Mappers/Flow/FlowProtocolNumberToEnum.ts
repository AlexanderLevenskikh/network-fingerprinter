import { FlowProtocol } from '../../DAL/Flow/FlowProtocol';
import { notEmpty } from '../../Shared/Utils/notEmpty';

const map: { [key: number]: FlowProtocol } = {
    1: FlowProtocol.Icmp,
    58: FlowProtocol.IcmpV6,
    4: FlowProtocol.IPv4,
    41: FlowProtocol.IPv6,
    6: FlowProtocol.Tcp,
    17: FlowProtocol.Udp,
};

export function mapFlowProtocolNumberToEnum(protocolNumber: number): FlowProtocol {
    const protocol = map[protocolNumber];

    if (notEmpty(protocol)) {
        return protocol;
    }

    return FlowProtocol.Unknown;
}
