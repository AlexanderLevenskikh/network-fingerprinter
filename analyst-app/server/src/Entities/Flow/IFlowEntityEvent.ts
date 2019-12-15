export interface IFlowEntityEvent {
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
