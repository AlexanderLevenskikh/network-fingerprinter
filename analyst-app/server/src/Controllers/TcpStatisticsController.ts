import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../Services/Guards/AuthenticatedGuard';
import { TcpStatisticsViewProvider } from '../DAL/Statistics/Tcp/TcpStatisticsViewProvider';
import { ITcpSourceStatisticsView } from '../DAL/Statistics/Tcp/ITcpSourceStatisticsView';
import { ITcpSourceStatisticsDetailsQuery } from '../DAL/Statistics/Tcp/ITcpSourceStatisticsDetailsQuery';
import { ITcpSourceStatisticsDetailsView } from '../DAL/Statistics/Tcp/ITcpSourceStatisticsDetailsView';

@UseGuards(AuthenticatedGuard)
@Controller('api/statistics/tcp')
export class TcpStatisticsController {
    constructor(private readonly tcpStatisticsViewProvider: TcpStatisticsViewProvider) {
    }

    @Get('source')
    async getSourcesStatistics(): Promise<ITcpSourceStatisticsView[]> {
        return this.tcpStatisticsViewProvider.getSourcesStatistics();
    }

    @Get('source/details')
    async getSourceStatisticsDetails(@Query() query: ITcpSourceStatisticsDetailsQuery): Promise<ITcpSourceStatisticsDetailsView> {
        return this.tcpStatisticsViewProvider.getSourceStatisticsDetails(query.ip, query.mac);
    }
}
