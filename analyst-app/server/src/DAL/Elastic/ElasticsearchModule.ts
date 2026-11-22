import { Module } from '@nestjs/common';
import { ElasticsearchService } from './ElasticsearchService';

@Module({
    providers: [ElasticsearchService],
    exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
