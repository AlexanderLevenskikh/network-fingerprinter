import { ITcpPacketIpDataView } from './ITcpPacketIpDataView';
import { ITcpPacketTcpDataView } from './ITcpPacketTcpDataView';

export interface ITcpPacketView {
    ip: ITcpPacketIpDataView;
    tcp: ITcpPacketTcpDataView;
}
