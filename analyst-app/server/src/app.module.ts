import { Module } from '@nestjs/common';
import { FlowModule } from './Modules/FlowModule';
import { PacketModule } from './Modules/PacketModule';

@Module({
    imports: [
        FlowModule,
        PacketModule,
    ],
})
export class AppModule {
}
