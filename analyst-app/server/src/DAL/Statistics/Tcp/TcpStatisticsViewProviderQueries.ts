import { term } from '../../../Shared/Utils/elastic/term';
import { and } from '../../../Shared/Utils/elastic/and';
import { or } from '../../../Shared/Utils/elastic/or';

export class TcpStatisticsViewProviderQueries {
    static buildSourcesStatisticsQuery() {
        return {
            size: 0,
            query: and(
                term('layers.ip.ip_ip_proto', 6),
                or(
                    term('layers.tls.tls_handshake_tls_handshake_type', '1'),
                    term('layers.http.http_http_request', '1'),
                    and(
                        term('layers.tcp.tcp_flags_tcp_flags_syn', '1'),
                        term('layers.tcp.tcp_flags_tcp_flags_ack', '0'),
                    ),
                ),
            ),
            aggs : {
                source : {
                    composite : {
                        sources : [
                            { ip: { terms : { field: 'layers.ip.ip_ip_src' } } },
                            { mac: { terms : { field: 'layers.eth.eth_eth_src' } } },
                        ],
                    },
                },
            },
        };
    }

    static buildDestinationsStatisticsQuery() {
        return {
            size: 0,
            query: and(
                term('layers.ip.ip_ip_proto', 6),
                or(
                    term('layers.http.http_http_response', '1'),
                    and(
                        term('layers.tcp.tcp_flags_tcp_flags_syn', '1'),
                        term('layers.tcp.tcp_flags_tcp_flags_ack', '1'),
                    ),
                ),
            ),
            aggs : {
                source : {
                    composite : {
                        sources : [
                            { ip: { terms : { field: 'layers.ip.ip_ip_src' } } },
                            { mac: { terms : { field: 'layers.eth.eth_eth_src' } } },
                        ],
                    },
                },
            },
        };
    }

    static buildRequestDetailsStatisticsQuery(ip: string, mac: string) {
        return {
            query: and(
                term('layers.ip.ip_ip_proto', 6),
                or(
                    term('layers.tls.tls_handshake_tls_handshake_type', '1'),
                    term('layers.http.http_http_request', '1'),
                    and(
                        term('layers.tcp.tcp_flags_tcp_flags_syn', '1'),
                        term('layers.tcp.tcp_flags_tcp_flags_ack', '0'),
                    ),
                ),
                term('layers.eth.eth_eth_src', mac),
                term('layers.ip.ip_ip_src', ip),
            ),
            aggs: {
                by_stream: {
                    terms: { field: 'streamId', size: 1000000000 },
                },
            },
        };
    }

    static buildDestinationStatisticsDetailsQuery(ip: string, mac: string) {
        return {
            query: and(
                term('layers.ip.ip_ip_proto', 6),
                or(
                    term('layers.http.http_http_response', '1'),
                    and(
                        term('layers.tcp.tcp_flags_tcp_flags_syn', '1'),
                        term('layers.tcp.tcp_flags_tcp_flags_ack', '1'),
                    ),
                ),
                term('layers.eth.eth_eth_src', mac),
                term('layers.ip.ip_ip_src', ip),
            ),
            aggs: {
                by_stream: {
                    terms: { field: 'streamId', size: 1000000000 },
                },
            },
        };
    }
}
