export interface ITcpRequestStatisticsDetailsView {
    ip: string;
    mac: string;
    hasTlsClientHello: boolean;
    hasHttpRequest: boolean;
    tcpFingerprints: string[];
    tlsFingerprints: string[];
    sslBlackListReasons: string[];
    httpFingerprints: string[];
}
