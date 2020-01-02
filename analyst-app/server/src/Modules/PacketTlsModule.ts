import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';
import { PacketViewTlsProvider } from '../DAL/Packet/Tls/PacketViewTlsProvider';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    providers: [
        PacketViewTlsProvider,
    ],
    exports: [
        PacketViewTlsProvider,
    ],
})
export class PacketTlsModule {
}
