import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';
import { TcpStreamController } from '../Controllers/TcpStreamController';
import { TcpStreamViewProvider } from '../DAL/Stream/Tcp/TcpStreamViewProvider';
import { HttpStreamViewProvider } from '../DAL/Stream/Http/HttpStreamViewProvider';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    controllers: [],
    providers: [
        HttpStreamViewProvider,
    ],
})
export class HttpStreamModule {
}
