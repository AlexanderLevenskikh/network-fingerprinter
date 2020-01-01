import { Module } from '@nestjs/common';
import { PlayerController } from '../Controllers/PlayerController';
import { PlayerService } from '../Services/Player/PlayerService';

@Module({
    controllers: [PlayerController],
    providers: [PlayerService],
})
export class PlayerModule {
}
