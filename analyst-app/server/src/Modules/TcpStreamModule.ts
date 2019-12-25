import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';
import { TcpStreamController } from '../Controllers/TcpStreamController';
import { TcpStreamViewProvider } from '../DAL/Stream/Tcp/TcpStreamViewProvider';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    controllers: [TcpStreamController],
    providers: [TcpStreamViewProvider],
})
export class TcpStreamModule {
}
