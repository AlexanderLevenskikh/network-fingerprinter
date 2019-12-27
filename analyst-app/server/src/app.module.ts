import { Module } from '@nestjs/common';
import { FlowModule } from './Modules/FlowModule';
import { PacketModule } from './Modules/PacketModule';
import { TcpStreamModule } from './Modules/TcpStreamModule';
import { HttpStreamModule } from './Modules/HttpStreamModule';
import { TlsPacketModule } from './Modules/TlsPacketModule';

@Module({
    imports: [
        FlowModule,
        PacketModule,
        TcpStreamModule,
        HttpStreamModule,
        TlsPacketModule,
    ],
})
export class AppModule {
}
