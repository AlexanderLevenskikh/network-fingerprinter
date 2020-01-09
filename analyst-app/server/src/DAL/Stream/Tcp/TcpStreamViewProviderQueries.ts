
import { ITcpStreamFilter } from './ITcpStreamFilter';
import { and } from '../../../Shared/Utils/elastic/and';
import { term } from '../../../Shared/Utils/elastic/term';
import { or } from '../../../Shared/Utils/elastic/or';
import { Nullable } from '../../../Shared/Types/Nullable';
import { range } from '../../../Shared/Utils/elastic/range';

export class TcpStreamViewProviderQueries {
    static buildTcpStreamMetaDataQuery(streamId: string) {
        return {
            query: {
                bool: {
                    filter: [
                        { term: { streamId } },
                    ],
                },
            },
            aggs: {
                min_epoch: {
                    min: {
                        field: 'layers.frame.frame_frame_time_epoch',
                    },
                },
                max_epoch: {
                    max: {
                        field: 'layers.frame.frame_frame_time_epoch',
                    },
                },
            },
        };
    }

    static buildTcpStreamIdsQuery(query: ITcpStreamFilter) {
        const {
            destinationPort, destinationMac, destinationIp, sourcePort,
            sourceMac, sourceIp, sensorId,
            dateTimeFrom, dateTimeTo,
        } = query;
        const dateTimeFromEpoch = TcpStreamViewProviderQueries.getDateStrEpochTime(dateTimeFrom);
        const dateTimeToEpoch = TcpStreamViewProviderQueries.getDateStrEpochTime(dateTimeTo);

        return {
            query: and(
                term('layers.ip.ip_ip_proto', 6),
                ...(sensorId ? [term('sensorId', sensorId)] : []),
                or(
                    and(
                        or(
                            term('layers.tls.tls_handshake_tls_handshake_type', '1'),
                            term('layers.http.http_http_request', '1'),
                            and(
                                term('layers.tcp.tcp_flags_tcp_flags_syn', '1'),
                                term('layers.tcp.tcp_flags_tcp_flags_ack', '0'),
                            ),
                        ),
                        ...(sourceMac ? [term('layers.eth.eth_eth_src', sourceMac)] : []),
                        ...(sourceIp ? [term('layers.ip.ip_ip_src', sourceIp)] : []),
                        ...(sourcePort ? [term('layers.tcp.tcp_tcp_srcport', sourcePort)] : []),
                        ...(destinationMac ? [term('layers.eth.eth_eth_dst', destinationMac)] : []),
                        ...(destinationIp ? [term('layers.ip.ip_ip_dst', destinationIp)] : []),
                        ...(destinationPort ? [term('layers.tcp.tcp_tcp_dstport', destinationPort)] : []),
                        ...(dateTimeFromEpoch || dateTimeToEpoch
                            ? [range('layers.frame.frame_frame_time_epoch', dateTimeFromEpoch, dateTimeToEpoch)]
                            : []),
                    ),
                    and(
                        or(
                            term('layers.http.http_http_response', '1'),
                            and(
                                term('layers.tcp.tcp_flags_tcp_flags_syn', '1'),
                                term('layers.tcp.tcp_flags_tcp_flags_ack', '1'),
                            ),
                        ),
                        ...(sourceMac ? [term('layers.eth.eth_eth_dst', sourceMac)] : []),
                        ...(sourceIp ? [term('layers.ip.ip_ip_dst', sourceIp)] : []),
                        ...(sourcePort ? [term('layers.tcp.tcp_tcp_dstport', sourcePort)] : []),
                        ...(destinationMac ? [term('layers.eth.eth_eth_src', destinationMac)] : []),
                        ...(destinationIp ? [term('layers.ip.ip_ip_src', destinationIp)] : []),
                        ...(destinationPort ? [term('layers.tcp.tcp_tcp_srcport', destinationPort)] : []),
                        ...(dateTimeFromEpoch || dateTimeToEpoch
                            ? [range('layers.frame.frame_frame_time_epoch', dateTimeFromEpoch, dateTimeToEpoch)]
                            : []),
                    ),
                ),
            ),
            aggs: {
                by_stream: {
                    terms: { field: 'streamId', size: 1000000000 },
                },
            },
        };
    }

    static buildTcpStreamDocumentCountQuery(streamId: string) {
        return {
            query: {
                term: {
                    streamId,
                },
            },
        };
    }

    static buildTcpStreamQuery(streamId: string) {
        return {
            bool: {
                filter: [
                    { term: { streamId } },
                ],
            },
        }
    }

    private static getDateStrEpochTime(dateStr: string): Nullable<number> {
        return (dateStr && !Number.isNaN(Date.parse(dateStr)))
            ? new Date(dateStr).valueOf() / 1000
            : null;
    }
}
