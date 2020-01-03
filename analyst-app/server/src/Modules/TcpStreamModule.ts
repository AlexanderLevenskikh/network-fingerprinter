import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';
import { TcpStreamController } from '../Controllers/TcpStreamController';
import { TcpStreamViewProvider } from '../DAL/Stream/Tcp/TcpStreamViewProvider';
import { PacketHttpModule } from './PacketHttpModule';
import { PacketTlsModule } from './PacketTlsModule';
import { PacketTcpModule } from './PacketTcpModule';
import { FingerprintModule } from './FingerprintModule';

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
        TcpStreamController,
    ],
    providers: [
        TcpStreamViewProvider,
    ],
})
export class TcpStreamModule {
}
