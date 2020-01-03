import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';
import { PacketViewTcpProvider } from '../DAL/Packet/Tcp/PacketViewTcpProvider';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    providers: [
        PacketViewTcpProvider,
    ],
    exports: [
        PacketViewTcpProvider,
    ],
})
export class PacketTcpModule {
}
