export interface IFlowEntity {
    agent: IAgent;
    destination: IDestination;
    source: ISource;
    fileset: IFileset;
    network: INetwork;
    input: IInput;
    observer: IObserver;
    netflow: INetflow;
    '@timestamp': Date;
    ecs: IEcs;
    service: IService;
    host: IHost;
    event: IEvent;
    flow: IFlow;
}

interface IAgent {
    hostname: string;
    id: string;
    type: string;
    ephemeral_id: string;
    version: string;
}

interface IDestination {
    geo: IGeo;
    as: IAs;
    port: number;
    ip: string;
    locality: string;
}

interface IAs {
    number: number;
    organization: IOrganization;
}

interface IOrganization {
    name: string;
}

interface IGeo {
    continent_name: string;
    region_iso_code: string;
    city_name: string;
    country_iso_code: string;
    region_name: string;
    location: Location;
}

interface ISource {
    port: number;
    ip: string;
    locality: string;
}

interface IFileset {
    name: string;
}

interface INetwork {
    community_id: string;
    bytes: number;
    transport: string;
    packets: number;
    iana_number: number;
    direction: string;
}

interface IInput {
    type: string;
}

interface IObserver {
    ip: string;
}

interface IExporter {
    uptime_millis: number;
    engine_type: number;
    address: string;
    engine_id: number;
    version: number;
    timestamp: Date;
    sampling_interval: number;
}

interface INetflow {
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
    exporter: IExporter;
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

interface IEcs {
    version: string;
}

interface IService {
    type: string;
}

interface IOs {
    kernel: string;
    codename: string;
    name: string;
    family: string;
    version: string;
    platform: string;
}

interface IHost {
    hostname: string;
    os: IOs;
    containerized: boolean;
    name: string;
    id: string;
    architecture: string;
}

interface IEvent {
    duration: number;
    created: Date;
    kind: string;
    module: string;
    start: Date;
    action: string;
    end: Date;
    category: string;
    dataset: string;
}

interface IFlow {
    locality: string;
    id: string;
}
