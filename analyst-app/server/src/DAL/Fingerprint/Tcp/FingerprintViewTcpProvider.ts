import { Injectable } from '@nestjs/common';
import { IFingerprintViewTcp } from './IFingerprintViewTcp';
import { IPacketViewTcp } from '../../Packet/Tcp/IPacketViewTcp';
import { Nullable } from '../../../Shared/Types/Nullable';
import { IPacketViewTls } from '../../Packet/Tls/IPacketViewTls';
import { IPacketViewHttp } from '../../Packet/Http/IPacketViewHttp';
import { tcpFingerprintProcessor, TcpFingerprintProcessorPacketType } from '../../../Processors/Fingerprint/Tcp/Tcp';
import {
    httpFingerprintProcessor,
    HttpFingerprintProcessorPacketType,
} from '../../../Processors/Fingerprint/Http/Http';
import { tlsFingerprintProcessor } from '../../../Processors/Fingerprint/Tls/Tls';
import { ISourceFingerprintsView } from './ISourceFingerprintsView';
import { IDestinationFingerprintsView } from './IDestinationFingerprintsView';

@Injectable()
export class FingerprintViewTcpProvider {
    public calculateFingerprints(
        tcpSyn: Nullable<IPacketViewTcp>,
        tcpSynAck: Nullable<IPacketViewTcp>,
        tlsClientHello: Nullable<IPacketViewTls>,
        httpRequest: Nullable<IPacketViewHttp>,
        httpResponse: Nullable<IPacketViewHttp>,
    ): IFingerprintViewTcp {
        const source = this.calculateRequestsFingerprints(tcpSyn, tlsClientHello, httpRequest);
        const destination = this.calculateResponsesFingerprints(tcpSynAck, httpResponse);

        return {
            source,
            destination,
        }
    }

    public calculateRequestsFingerprints(
        tcpSyn: Nullable<IPacketViewTcp>,
        tlsClientHello: Nullable<IPacketViewTls>,
        httpRequest: Nullable<IPacketViewHttp>,
    ): ISourceFingerprintsView {
        return  {
            tcp: tcpSyn
                ? tcpFingerprintProcessor(tcpSyn, TcpFingerprintProcessorPacketType.Syn)
                : null,
            tls: tlsClientHello
                ? tlsFingerprintProcessor(tlsClientHello)
                : null,
            http: httpRequest ?
                httpFingerprintProcessor(httpRequest, HttpFingerprintProcessorPacketType.Request)
                : null,
        };
    }

    public calculateResponsesFingerprints(
        tcpSynAck: Nullable<IPacketViewTcp>,
        httpResponse: Nullable<IPacketViewHttp>,
    ): IDestinationFingerprintsView {
        return  {
            tcp: tcpSynAck
                ? tcpFingerprintProcessor(tcpSynAck, TcpFingerprintProcessorPacketType.SynAck)
                : null,
            http: httpResponse
                ? httpFingerprintProcessor(httpResponse, HttpFingerprintProcessorPacketType.Response)
                : null,
        };
    }
}
