import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';
import { PacketViewHttpProvider } from '../DAL/Packet/Http/PacketViewHttpProvider';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    providers: [
        PacketViewHttpProvider,
    ],
    exports: [
        PacketViewHttpProvider,
    ],
})
export class PacketHttpModule {
}
