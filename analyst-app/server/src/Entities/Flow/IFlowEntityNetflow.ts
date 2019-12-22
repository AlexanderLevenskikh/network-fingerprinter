import { IFlowEntityExporter } from './IFlowEntityExporter';

export interface IFlowEntityNetflow {
    destination_ipv4_prefix_length: number;
    source_ipv4_prefix_length: number;
    protocol_identifier: number;
    packet_delta_count: number;
    bgp_destination_as_number: number;
    flow_start_sys_up_time: number;
    egress_interface: number;
    octet_delta_count: number;
    bgp_source_as_number: number;
    type: string;
    ip_next_hop_ipv4_address: string;
    destination_ipv4_address: string;
    source_ipv4_address: string;
    exporter: IFlowEntityExporter;
    tcp_control_bits: number;
    ip_class_of_service: number;
    ingress_interface: number;
    flow_end_sys_up_time: number;
    destination_transport_port: number;
    source_transport_port: number;
    flow_start_milliseconds: Date;
    tcp_options: number;
    flow_end_reason: number;
    flow_end_milliseconds: Date;
}
