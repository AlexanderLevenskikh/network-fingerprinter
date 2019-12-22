import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';
import { PacketViewProvider } from '../DAL/Packet/PacketViewProvider';
import { PacketController } from '../Controllers/PacketController';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    controllers: [PacketController],
    providers: [PacketViewProvider],
})
export class PacketModule {
}
