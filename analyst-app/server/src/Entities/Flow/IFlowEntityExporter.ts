export interface IFlowEntityExporter {
    uptime_millis: number;
    engine_type: number;
    address: string;
    engine_id: number;
    version: number;
    timestamp: Date;
    sampling_interval: number;
}
