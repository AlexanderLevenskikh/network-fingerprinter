import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '../DAL/Elastic/ElasticsearchModule';
import { PacketViewTcpProvider } from '../DAL/Packet/Tcp/PacketViewTcpProvider';

@Module({
    imports: [
        ElasticsearchModule,
    ],
    providers: [
        PacketViewTcpProvider,
    ],
    exports: [
        PacketViewTcpProvider,
    ],
})
export class PacketTcpModule {
}
