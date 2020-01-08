import { IPacketViewHttp } from '../../../DAL/Packet/Http/IPacketViewHttp';
import { PacketViewIpVersion } from '../../../DAL/Packet/Ip/PacketViewIpVersion';
import { PacketViewHttpVersion } from '../../../DAL/Packet/Http/PacketViewHttpVersion';
import { PacketViewHttpType } from '../../../DAL/Packet/Http/PacketViewHttpType';
import { IPacketViewTcp } from '../../../DAL/Packet/Tcp/IPacketViewTcp';

export const tcpPacketStub: IPacketViewTcp = {
    frame: {
        protocolsInFrame: [],
    },
    eth: {
        sourceMac: 'sourceMac',
        destinationMac: 'destinationMac',
    },
    ip: {
        version: PacketViewIpVersion.IPv4,
        ecn: false,
        identifier: 1,
        ipFlags: {
            zeroBitIsZero: true,
            dontFragment: true,
            moreFragments: false,
        },
        ttl: 128,
        sourceIp: '192.168.1.1',
        destinationIp: '10.0.0.1',
    },
    tcp: {
        streamId: '1',
        sensorId: '1',
        sourcePort: 2432,
        destinationPort: 80,
        windowScalingFactor: 7,
        windowSize: 100,
        sequenceNumber: 100000,
        maximumSegmentSize: 1460,
        tcpFlags: {
            push: false,
            urg: false,
            ack: true,
            cwr: false,
            ecn: true,
            fin: false,
            ns: false,
            res: false,
            reset: false,
            str: false,
            syn: false,
        },
        ackNumber: 1000,
        tcpOptions: [],
        urgPointer: 321423,
    },
};
