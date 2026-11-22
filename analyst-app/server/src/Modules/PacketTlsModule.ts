import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '../DAL/Elastic/ElasticsearchModule';
import { PacketViewTlsProvider } from '../DAL/Packet/Tls/PacketViewTlsProvider';

@Module({
    imports: [
        ElasticsearchModule,
    ],
    providers: [
        PacketViewTlsProvider,
    ],
    exports: [
        PacketViewTlsProvider,
    ],
})
export class PacketTlsModule {
}
