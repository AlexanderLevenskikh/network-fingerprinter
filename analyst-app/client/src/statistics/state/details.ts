import { ITcpRequestStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpRequestStatisticsDetailsView';
import { ITcpResponseStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpResponseStatisticsDetailsView';

export class TcpStatisticsDetailsState {
    requestDetails: ITcpRequestStatisticsDetailsView = {
        ip: '',
        mac: '',
        hasHttpRequest: false,
        hasTlsClientHello: false,
        httpFingerprints: [],
        tlsFingerprints: [],
        tcpFingerprints: [],
    };
    requestDetailsLoading: boolean = false;
    requestDrawerOpened: boolean = false;
    requestIp: string = '';
    requestMac: string = '';

    responseDetails: ITcpResponseStatisticsDetailsView = {
        ip: '',
        mac: '',
        hasHttpResponse: false,
        httpFingerprints: [],
        tcpFingerprints: [],
    };
    responseDetailsLoading: boolean = false;
    responseDrawerOpened: boolean = false;
    responseIp: string = '';
    responseMac: string = '';
}
