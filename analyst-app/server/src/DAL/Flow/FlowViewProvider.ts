import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class FlowViewProvider {
    elasticClient: Client;

    constructor() {
        this.elasticClient = new Client({ node: 'http://192.168.141.128:9200' });
    }

    getFlows() {
        return this.elasticClient.search({
            index: 'filebeat-*',
            from: 20,
            size: 100,
            pretty: true,
        });
    }
}
