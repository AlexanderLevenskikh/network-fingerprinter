import { Controller, Get } from '@nestjs/common';
import { PacketViewProvider } from '../DAL/Packet/PacketViewProvider';
import { TcpStreamViewProvider } from '../DAL/Stream/Tcp/TcpStreamViewProvider';
import { ITcpStreamView } from '../DAL/Stream/Tcp/ITcpStreamView';

@Controller('api/stream/tcp')
export class TcpStreamController {
    constructor(private readonly tcpStreamViewProvider: TcpStreamViewProvider) {
    }


    @Get('list')
    async getTcpPacketsStreamsWithFingerprints(): Promise<ITcpStreamView[]> {
        return this.tcpStreamViewProvider.getTcpStreams();
    }
}
