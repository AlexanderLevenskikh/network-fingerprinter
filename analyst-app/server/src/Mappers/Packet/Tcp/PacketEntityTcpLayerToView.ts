import { IPacketEntityTcp } from '../../../Entities/Packet/IPacketEntityTcp';
import { parseIntNullable } from '../../../Shared/Utils/parseIntNullable';
import { IPacketViewTcpLayer } from '../../../DAL/Packet/Tcp/IPacketViewTcpLayer';
import { mapPacketEntityTcpLayerOptionsToView } from './PacketEntityTcpLayerOptionsToView';

export function mapPacketEntityTcpLayerToView(streamId: string, entity: IPacketEntityTcp): IPacketViewTcpLayer {
    const {
        tcp_options_mss_tcp_options_mss_val, tcp_tcp_window_size_value,
        tcp_options_wscale_tcp_options_wscale_shift, tcp_tcp_seq, tcp_tcp_ack, tcp_tcp_urgent_pointer,
        tcp_flags_tcp_flags_ack, tcp_flags_tcp_flags_cwr, tcp_flags_tcp_flags_ecn,
        tcp_flags_tcp_flags_fin, tcp_flags_tcp_flags_ns, tcp_flags_tcp_flags_push, tcp_flags_tcp_flags_res,
        tcp_flags_tcp_flags_str, tcp_flags_tcp_flags_reset, tcp_flags_tcp_flags_syn,
        tcp_flags_tcp_flags_urg, tcp_tcp_srcport, tcp_tcp_dstport, tcp_tcp_options,
    } = entity;

    const maximumSegmentSize = parseIntNullable(tcp_options_mss_tcp_options_mss_val);
    const windowSize = parseIntNullable(tcp_tcp_window_size_value);
    const windowScalingFactor = parseIntNullable(tcp_options_wscale_tcp_options_wscale_shift);
    const sequenceNumber = parseIntNullable(tcp_tcp_seq);
    const ackNumber = parseIntNullable(tcp_tcp_ack);
    const urgPointer = parseIntNullable(tcp_tcp_urgent_pointer);

    const tcpOptions = mapPacketEntityTcpLayerOptionsToView(tcp_tcp_options);

    return {
        streamId,
        sourcePort: Number.parseInt(tcp_tcp_srcport, 10),
        destinationPort: Number.parseInt(tcp_tcp_dstport, 10),
        maximumSegmentSize,
        windowSize,
        windowScalingFactor,
        sequenceNumber,
        ackNumber,
        urgPointer,
        tcpOptions,
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
    }
}
