import { Module } from '@nestjs/common';
import { PlayerController } from '../Controllers/PlayerController';
import { PlayerService } from '../Services/Player/PlayerService';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    controllers: [PlayerController],
    providers: [PlayerService],
})
export class PlayerModule {
}
