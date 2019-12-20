import {IPacketEntityTcp} from '../../../Entities/Packet/IPacketEntityTcp';
import {ITcpPacketTcpDataView} from '../../../DAL/Packet/Tcp/ITcpPacketTcpDataView';
import {parseIntNullable} from "../../../Shared/Utils/parseIntNullable";

export function mapPacketEntityTcpLayerToView(entity: IPacketEntityTcp): ITcpPacketTcpDataView {
    const {
        tcp_options_mss_tcp_options_mss_val, tcp_tcp_window_size_value,
        tcp_options_wscale_tcp_options_wscale_shift, tcp_tcp_seq, tcp_tcp_ack, tcp_tcp_urgent_pointer,
        tcp_flags_tcp_flags_ack, tcp_flags_tcp_flags_cwr, tcp_flags_tcp_flags_ecn,
        tcp_flags_tcp_flags_fin, tcp_flags_tcp_flags_ns, tcp_flags_tcp_flags_push, tcp_flags_tcp_flags_res,
        tcp_flags_tcp_flags_str, tcp_flags_tcp_flags_reset, tcp_flags_tcp_flags_syn,
        tcp_flags_tcp_flags_urg,
    } = entity;

    const maximumSegmentSize = parseIntNullable(tcp_options_mss_tcp_options_mss_val);
    const windowSize = parseIntNullable(tcp_tcp_window_size_value);
    const windowScalingFactor = parseIntNullable(tcp_options_wscale_tcp_options_wscale_shift);
    const sequenceNumber = parseIntNullable(tcp_tcp_seq);
    const ackNumber = parseIntNullable(tcp_tcp_ack);
    const urgPointer = parseIntNullable(tcp_tcp_urgent_pointer);


    return {
        maximumSegmentSize,
        windowSize,
        windowScalingFactor,
        sequenceNumber,
        ackNumber,
        urgPointer,
        tcpOptions: [],
        tcpFlags: {
            res: tcp_flags_tcp_flags_res === '1',
            ns: tcp_flags_tcp_flags_ns === '1',
            cwr: tcp_flags_tcp_flags_cwr === '1',
            ecn: tcp_flags_tcp_flags_ecn === '1',
            urg: tcp_flags_tcp_flags_urg === '1',
            ack: tcp_flags_tcp_flags_ack === '1',
            push: tcp_flags_tcp_flags_push === '1',
            reset: tcp_flags_tcp_flags_reset === '1',
            syn: tcp_flags_tcp_flags_syn === '1',
            fin: tcp_flags_tcp_flags_fin === '1',
            str: tcp_flags_tcp_flags_str === '1',
        },
        explicitEndOfOptionsInBytes: null,
    }
}
