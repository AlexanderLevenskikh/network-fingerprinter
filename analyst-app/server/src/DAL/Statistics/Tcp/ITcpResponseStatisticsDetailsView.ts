export interface ITcpResponseStatisticsDetailsView {
    ip: string;
    mac: string;
    hasHttpResponse: boolean;
    tcpFingerprints: string[];
    httpFingerprints: string[];
}
