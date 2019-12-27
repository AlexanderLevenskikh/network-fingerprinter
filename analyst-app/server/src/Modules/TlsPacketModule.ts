import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';
import { TcpStreamController } from '../Controllers/TcpStreamController';
import { TcpStreamViewProvider } from '../DAL/Stream/Tcp/TcpStreamViewProvider';
import { HttpStreamViewProvider } from '../DAL/Stream/Http/HttpStreamViewProvider';
import { TlsPacketViewProvider } from '../DAL/Packet/Tls/tls-packet-view-provider.service';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    controllers: [],
    providers: [
        TlsPacketViewProvider,
    ],
})
export class TlsPacketModule {
}
