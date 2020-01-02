import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TcpStreamViewProvider } from '../DAL/Stream/Tcp/TcpStreamViewProvider';
import { ITcpStreamView } from '../DAL/Stream/Tcp/ITcpStreamView';
import { ITcpStreamFilter } from '../DAL/Stream/Tcp/ITcpStreamFilter';
import { AuthenticatedGuard } from '../Services/Guards/AuthenticatedGuard';

@UseGuards(AuthenticatedGuard)
@Controller('api/stream/tcp')
export class TcpStreamController {
    constructor(private readonly tcpStreamViewProvider: TcpStreamViewProvider) {
    }

    @Get('list')
    async getTcpPacketsStreamsWithFingerprints(@Query() query: ITcpStreamFilter): Promise<ITcpStreamView[]> {
        return this.tcpStreamViewProvider.getTcpStreams(query);
    }

    @Get('list/total')
    async getTcpPacketsStreamsWithFingerprintsTotal(@Query() query: ITcpStreamFilter): Promise<number> {
        return this.tcpStreamViewProvider.getTcpStreamsTotal(query);
    }
}
