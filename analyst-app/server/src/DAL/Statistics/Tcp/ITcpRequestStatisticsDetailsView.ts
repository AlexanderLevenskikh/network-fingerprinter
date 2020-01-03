export interface ITcpRequestStatisticsDetailsView {
    ip: string;
    mac: string;
    hasTlsClientHello: boolean;
    hasHttpRequest: boolean;
    tcpFingerprints: string[];
    tlsFingerprints: string[];
    httpFingerprints: string[];
}
