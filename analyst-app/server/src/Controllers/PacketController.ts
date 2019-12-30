import { Controller, Get, UseGuards } from '@nestjs/common';
import { PacketViewProvider } from '../DAL/Packet/PacketViewProvider';
import { AuthenticatedGuard } from '../Domain/Guards/AuthenticatedGuard';

@UseGuards(AuthenticatedGuard)
@Controller('api/packet')
export class PacketController {
    constructor(private readonly packetViewProvider: PacketViewProvider) {
    }

    @Get('list')
    async getPackets(): Promise<any> {
        return this.packetViewProvider.getPackets();
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
