import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '../DAL/Elastic/ElasticsearchModule';
import { PacketViewHttpProvider } from '../DAL/Packet/Http/PacketViewHttpProvider';

@Module({
    imports: [
        ElasticsearchModule,
    ],
    providers: [
        PacketViewHttpProvider,
    ],
    exports: [
        PacketViewHttpProvider,
    ],
})
export class PacketHttpModule {
}
