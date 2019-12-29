import { SearchParamsModel } from 'root/shared/model/searchParams';

export class TcpStreamsSearchParamsModel extends SearchParamsModel {
    streamId?: string;
    dateTimeFrom?: string;
    dateTimeTo?: string;
    sourceIp?: string;
    sourceMac?: string;
    sourcePort?: string;
    destinationIp?: string;
    destinationMac?: string;
    destinationPort?: string;

    constructor(query: Partial<TcpStreamsSearchParamsModel>) {
        super(query.skip, query.take);

        this.streamId = query.streamId ||undefined;
        this.dateTimeFrom = query.dateTimeFrom ||undefined;
        this.dateTimeTo = query.dateTimeTo ||undefined;
        this.sourceIp = query.sourceIp ||undefined;
        this.sourceMac = query.sourceMac ||undefined;
        this.sourcePort = query.sourcePort ||undefined;
        this.destinationIp = query.destinationIp ||undefined;
        this.destinationMac = query.destinationMac ||undefined;
        this.destinationPort = query.destinationPort ||undefined;
    }
}
