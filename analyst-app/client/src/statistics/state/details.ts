import { ITcpSourceStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsDetailsView';
import { ITcpDestinationStatisticsDetailsView } from 'DAL/Statistics/Tcp/ITcpDestinationStatisticsDetailsView';

export class TcpStatisticsDetailsState {
    sourceDetails: ITcpSourceStatisticsDetailsView = {
        ip: '',
        mac: '',
        hasHttpRequest: false,
        hasTlsClientHello: false,
        httpFingerprints: [],
        tlsFingerprints: [],
        tcpFingerprints: [],
    };
    sourceDetailsLoading: boolean = false;
    sourceDrawerOpened: boolean = false;
    sourceIp: string = '';
    sourceMac: string = '';

    destinationDetails: ITcpDestinationStatisticsDetailsView = {
        ip: '',
        mac: '',
        hasHttpResponse: false,
        httpFingerprints: [],
        tcpFingerprints: [],
    };
    destinationDetailsLoading: boolean = false;
    destinationDrawerOpened: boolean = false;
    destinationIp: string = '';
}
