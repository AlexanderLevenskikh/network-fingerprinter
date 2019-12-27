import { Module } from '@nestjs/common';
import { FlowModule } from './Modules/FlowModule';
import { PacketModule } from './Modules/PacketModule';
import { TcpStreamModule } from './Modules/TcpStreamModule';
import { HttpStreamModule } from './Modules/HttpStreamModule';

@Module({
    imports: [
        FlowModule,
        PacketModule,
        TcpStreamModule,
        HttpStreamModule,
    ],
})
export class AppModule {
}
