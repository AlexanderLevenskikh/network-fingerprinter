import { Controller, Get } from '@nestjs/common';
import { FlowViewProvider } from '../DAL/Flow/FlowViewProvider';
import { PacketViewProvider } from '../DAL/Packet/PacketViewProvider';

@Controller('api/packet')
export class PacketController {
    constructor(private readonly packetViewProvider: PacketViewProvider) {}

    @Get('list')
    async getFlows(): Promise<any> {
        return this.packetViewProvider.getPackets();
    }
}
