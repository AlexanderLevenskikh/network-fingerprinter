export interface ITcpDestinationStatisticsDetailsView {
    ip: string;
    mac: string;
    hasHttpResponse: boolean;
    tcpFingerprints: string[];
    httpFingerprints: string[];
}
