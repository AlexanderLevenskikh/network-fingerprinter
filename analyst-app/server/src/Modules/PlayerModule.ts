import { Module } from '@nestjs/common';
import { PlayerController } from '../Controllers/PlayerController';
import { PlayerService } from '../Services/Player/PlayerService';
import { ElasticsearchModule } from '../DAL/Elastic/ElasticsearchModule';

@Module({
    imports: [
        ElasticsearchModule,
    ],
    controllers: [PlayerController],
    providers: [PlayerService],
})
export class PlayerModule {
}
