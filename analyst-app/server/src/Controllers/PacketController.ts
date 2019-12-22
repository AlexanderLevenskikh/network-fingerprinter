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

    @Get('list/tcp')
    async getTcpPackets(): Promise<any> {
        return this.packetViewProvider.getTcpPackets();
    }
}
