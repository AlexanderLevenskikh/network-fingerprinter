import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
    createElasticsearchOptions(): ElasticsearchModuleOptions {
        return {
            host: `http://${process.env.ELASTIC_HOST}`,
            httpAuth: `${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASSWORD}`,
        };
    }
}
