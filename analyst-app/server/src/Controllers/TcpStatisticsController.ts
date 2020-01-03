import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../Services/Guards/AuthenticatedGuard';
import { TcpStatisticsViewProvider } from '../DAL/Statistics/Tcp/TcpStatisticsViewProvider';
import { ITcpHostStatisticsView } from '../DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { ITcpHostStatisticsDetailsQuery } from '../DAL/Statistics/Tcp/ITcpHostStatisticsDetailsQuery';
import { ITcpRequestStatisticsDetailsView } from '../DAL/Statistics/Tcp/ITcpRequestStatisticsDetailsView';
import { ITcpResponseStatisticsDetailsView } from '../DAL/Statistics/Tcp/ITcpResponseStatisticsDetailsView';

@UseGuards(AuthenticatedGuard)
@Controller('api/statistics/tcp')
export class TcpStatisticsController {
    constructor(private readonly tcpStatisticsViewProvider: TcpStatisticsViewProvider) {
    }

    @Get('request')
    async getRequestStatistics(): Promise<ITcpHostStatisticsView[]> {
        return this.tcpStatisticsViewProvider.getRequestStatistics();
    }

    @Get('request/details')
    async getRequestStatisticsDetails(@Query() query: ITcpHostStatisticsDetailsQuery): Promise<ITcpRequestStatisticsDetailsView> {
        return this.tcpStatisticsViewProvider.getRequestStatisticsDetails(query.ip, query.mac);
    }

    @Get('response')
    async getResponseStatistics(): Promise<ITcpHostStatisticsView[]> {
        return this.tcpStatisticsViewProvider.getResponseStatistics();
    }

    @Get('response/details')
    async getResponseStatisticsDetails(@Query() query: ITcpHostStatisticsDetailsQuery): Promise<ITcpResponseStatisticsDetailsView> {
        return this.tcpStatisticsViewProvider.getResponseStatisticsDetails(query.ip, query.mac);
    }
}
