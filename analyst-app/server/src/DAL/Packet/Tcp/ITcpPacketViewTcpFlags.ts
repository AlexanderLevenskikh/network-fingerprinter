export interface ITcpPacketViewTcpFlags {
    res: boolean;
    ns: boolean;
    cwr: boolean;
    ecn: boolean;
    urg: boolean;
    ack: boolean;
    push: boolean;
    reset: boolean;
    syn: boolean;
    fin: boolean;
    str: boolean;
}
