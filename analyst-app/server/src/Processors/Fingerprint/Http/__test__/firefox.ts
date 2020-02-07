import { IPacketViewHttp } from '../../../../DAL/Packet/Http/IPacketViewHttp';
import { PacketViewIpVersion } from '../../../../DAL/Packet/Ip/PacketViewIpVersion';
import { PacketViewHttpType } from '../../../../DAL/Packet/Http/PacketViewHttpType';
import { PacketViewHttpVersion } from '../../../../DAL/Packet/Http/PacketViewHttpVersion';
import { PacketViewHttpHeaderName } from '../../../../DAL/Packet/Http/PacketViewHttpHeaderName';

// Firefox 2.x P0f confirmed
export const httpFirefoxPacketStub: IPacketViewHttp = {
    frame: {
        protocolsInFrame: [
            'eth',
            'ethertype',
            'ip',
            'tcp',
            'http',
        ],
    },
    eth: {
        sourceMac: '00:21:6a:5b:7d:4a',
        destinationMac: '00:05:5d:21:99:4c',
    },
    ip: {
        sourceIp: '172.16.16.128',
        destinationIp: '67.228.110.120',
        version: PacketViewIpVersion.IPv4,
        ttl: 128,
        identifier: 12691,
        ecn: false,
        ipFlags: {
            zeroBitIsZero: true,
            dontFragment: true,
            moreFragments: false,
        },
    },
    tcp: {
        streamId: '3da9ecf0-494c-11ea-97c0-b9e0a2f3456a-2',
        sensorId: 'pcap-player-1',
        sourcePort: 2828,
        destinationPort: 80,
        maximumSegmentSize: null,
        windowSize: 4218,
        windowScalingFactor: null,
        sequenceNumber: 1,
        ackNumber: 1,
        urgPointer: 0,
        tcpOptions: [],
        tcpFlags: {
            res: false,
            ns: false,
            cwr: false,
            ecn: false,
            urg: false,
            ack: true,
            push: true,
            reset: false,
            syn: false,
            fin: false,
            str: false,
        },
    },
    http: {
        type: PacketViewHttpType.Request,
        version: PacketViewHttpVersion.Http1_1,
        headers: [
            {
                name: PacketViewHttpHeaderName.Host,
                value: 'www.wireshark.org\r\n',
            },
            {
                name: PacketViewHttpHeaderName.UserAgent,
                value: 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv',
            },
            {
                name: PacketViewHttpHeaderName.Accept,
                value: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n',
            },
            {
                name: PacketViewHttpHeaderName.AcceptLanguage,
                value: 'en-us,en;q=0.5\r\n',
            },
            {
                name: PacketViewHttpHeaderName.AcceptEncoding,
                value: 'gzip,deflate\r\n',
            },
            {
                name: PacketViewHttpHeaderName.AcceptCharset,
                value: 'ISO-8859-1,utf-8;q=0.7,*;q=0.7\r\n',
            },
            {
                name: PacketViewHttpHeaderName.KeepAlive,
                value: '300\r\n',
            },
            {
                name: PacketViewHttpHeaderName.Connection,
                value: 'keep-alive\r\n',
            },
        ],
    },
};
