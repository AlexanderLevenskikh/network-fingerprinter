import { TcpStreamFilterDateOrder } from './TcpStreamFilterDateOrder';

export interface ITcpStreamFilter {
    current?: string;
    take?: string;
    dateTimeFrom?: string;
    dateTimeFromOrder?: TcpStreamFilterDateOrder;
    dateTimeTo?: string;
    dateTimeToOrder?: TcpStreamFilterDateOrder;
    sourceIp?: string;
    sourceMac?: string;
    sourcePort?: string;
    destinationIp?: string;
    destinationMac?: string;
    destinationPort?: string;
    sensorId?: string;
}
