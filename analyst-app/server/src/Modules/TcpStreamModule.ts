import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '../DAL/Elastic/ElasticsearchModule';
import { TcpStreamController } from '../Controllers/TcpStreamController';
import { TcpStreamViewProvider } from '../DAL/Stream/Tcp/TcpStreamViewProvider';
import { PacketHttpModule } from './PacketHttpModule';
import { PacketTlsModule } from './PacketTlsModule';
import { PacketTcpModule } from './PacketTcpModule';
import { FingerprintModule } from './FingerprintModule';

@Module({
    imports: [
        ElasticsearchModule,
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
