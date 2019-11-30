import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
    createElasticsearchOptions(): ElasticsearchModuleOptions {
        return {
            host: 'http://192.168.141.128:9200',
        };
    }
}
