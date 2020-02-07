import { IPacketViewTcp } from '../../../../DAL/Packet/Tcp/IPacketViewTcp';
import { PacketViewIpVersion } from '../../../../DAL/Packet/Ip/PacketViewIpVersion';
import { PacketViewTcpOptionType } from '../../../../DAL/Packet/Tcp/PacketViewTcpOptionType';

export const windows7or8packetStub: IPacketViewTcp = {
    frame: {
        protocolsInFrame: [
            'eth',
            'ethertype',
            'ip',
            'tcp',
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
        identifier: 12689,
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
        maximumSegmentSize: 1460,
        windowSize: 8192,
        windowScalingFactor: 2,
        sequenceNumber: 0,
        ackNumber: 0,
        urgPointer: 0,
        tcpOptions: [
            {
                type: PacketViewTcpOptionType.mss,
            },
            {
                type: PacketViewTcpOptionType.nop,
            },
            {
                type: PacketViewTcpOptionType.ws,
            },
            {
                type: PacketViewTcpOptionType.nop,
            },
            {
                type: PacketViewTcpOptionType.nop,
            },
            {
                type: PacketViewTcpOptionType.sok,
            },
        ],
        tcpFlags: {
            res: false,
            ns: false,
            cwr: false,
            ecn: false,
            urg: false,
            ack: false,
            push: false,
            reset: false,
            syn: true,
            fin: false,
            str: false,
        },
    },
};
