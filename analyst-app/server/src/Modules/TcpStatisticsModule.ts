import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';
import { TcpStreamController } from '../Controllers/TcpStreamController';
import { TcpStreamViewProvider } from '../DAL/Stream/Tcp/TcpStreamViewProvider';
import { PacketHttpModule } from './PacketHttpModule';
import { PacketTlsModule } from './PacketTlsModule';
import { PacketTcpModule } from './PacketTcpModule';
import { FingerprintModule } from './FingerprintModule';
import { TcpStatisticsController } from '../Controllers/TcpStatisticsController';
import { TcpStatisticsViewProvider } from '../DAL/Statistics/Tcp/TcpStatisticsViewProvider';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
        PacketTlsModule,
        PacketHttpModule,
        PacketTcpModule,
        FingerprintModule,
    ],
    controllers: [
        TcpStatisticsController,
    ],
    providers: [
        TcpStatisticsViewProvider,
    ],
})
export class TcpStatisticsModule {
}
