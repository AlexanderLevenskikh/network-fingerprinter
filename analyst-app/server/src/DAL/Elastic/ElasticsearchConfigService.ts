import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
    createElasticsearchOptions(): ElasticsearchModuleOptions {
        return {
            host: 'http://127.0.0.1:9200',
            httpAuth: 'elastic:12345',
        };
    }
}
