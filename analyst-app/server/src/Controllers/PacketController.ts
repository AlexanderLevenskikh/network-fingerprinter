import { Controller, Get } from '@nestjs/common';
import { PacketViewProvider } from '../DAL/Packet/PacketViewProvider';

@Controller('api/packet')
export class PacketController {
    constructor(private readonly packetViewProvider: PacketViewProvider) {
    }

    @Get('list')
    async getPackets(): Promise<any> {
        return this.packetViewProvider.getPackets();
    }

    @Get('list/tcp/streams')
    async getTcpPackets(): Promise<any> {
        return this.packetViewProvider.getTcpPacketsGroupedByStreams();
    }

    @Get('list/tcp/handshake')
    async getTcpHandshakePackets(): Promise<any> {
        return this.packetViewProvider.getHandshakeTcpPackets();
    }

    @Get('list/src_ips')
    async getSrcIps(): Promise<any> {
        return this.packetViewProvider.getDistinctHosts(true);
    }

    @Get('list/dst_ips')
    async getDstIps(): Promise<any> {
        return this.packetViewProvider.getDistinctHosts(false);
    }
}
