import { Module } from '@nestjs/common';
import { FlowModule } from './Modules/FlowModule';
import { PacketModule } from './Modules/PacketModule';
import { TcpStreamModule } from './Modules/TcpStreamModule';

@Module({
    imports: [
        FlowModule,
        PacketModule,
        TcpStreamModule,
    ],
})
export class AppModule {
}
