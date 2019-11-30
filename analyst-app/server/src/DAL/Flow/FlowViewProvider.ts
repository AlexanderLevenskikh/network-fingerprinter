import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { map } from 'rxjs/operators';
import { IFlowEntity } from '../../Entities/Flow/IFlowEntity';
import { SearchResponse } from 'elasticsearch';

@Injectable()
export class FlowViewProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {}

    async getFlows(): Promise<IFlowEntity[]> {
        return this.elasticsearchService
            .search({
                index: 'filebeat-*',
                from: 20,
                size: 2,
            })
            .pipe(map(this.mapSearchResponseToFlowEntities))
            .toPromise();
    }

    private mapSearchResponseToFlowEntities(response: SearchResponse<any>): IFlowEntity[] {
        return response.hits.hits.map(hit => hit._source as IFlowEntity);
    }
}
