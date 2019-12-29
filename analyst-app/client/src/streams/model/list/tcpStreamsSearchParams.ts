import { SearchParamsModel } from 'root/shared/model/searchParams';

export class TcpStreamsSearchParamsModel extends SearchParamsModel {
    dateTimeFrom?: string;
    dateTimeTo?: string;
    sourceIp?: string;
    sourceMac?: string;
    sourcePort?: string;
    destinationIp?: string;
    destinationMac?: string;
    destinationPort?: string;
    sensorId?: string;

    constructor(query: Partial<TcpStreamsSearchParamsModel>) {
        super(query.current, query.take);

        this.dateTimeFrom = query.dateTimeFrom ||undefined;
        this.dateTimeTo = query.dateTimeTo ||undefined;
        this.sourceIp = query.sourceIp ||undefined;
        this.sourceMac = query.sourceMac ||undefined;
        this.sourcePort = query.sourcePort ||undefined;
        this.destinationIp = query.destinationIp ||undefined;
        this.destinationMac = query.destinationMac ||undefined;
        this.destinationPort = query.destinationPort ||undefined;
        this.sensorId = query.sensorId ||undefined;
    }
}
