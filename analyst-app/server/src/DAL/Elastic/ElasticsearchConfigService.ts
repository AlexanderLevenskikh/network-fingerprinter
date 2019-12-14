import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
    createElasticsearchOptions(): ElasticsearchModuleOptions {
        return {
            host: 'http://192.168.1.50:9200',
            httpAuth: 'elastic:12345',
        };
    }
}
