import { Module } from '@nestjs/common';
import { FlowController } from '../Web/Controllers/FlowController';
import { FlowViewProvider } from '../DAL/Flow/FlowViewProvider';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../DAL/Elastic/ElasticsearchConfigService';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    controllers: [FlowController],
    providers: [FlowViewProvider],
})
export class FlowModule {}
