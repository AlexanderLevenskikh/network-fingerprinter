import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { filter, map } from 'rxjs/operators';
import { IFlowEntity } from '../../Entities/Flow/IFlowEntity';
import { SearchResponse } from 'elasticsearch';
import { mapFlowEntityToView } from '../../Mappers/Flow/FlowEntityToView';
import { IFlowView } from './IFlowView';

@Injectable()
export class FlowViewProvider {
    constructor(private readonly elasticsearchService: ElasticsearchService) {}

    async getFlows(): Promise<IFlowView[]> {
        return this.elasticsearchService
            .search<IFlowEntity>({
                index: 'filebeat-*',
                from: 20,
                size: 1,
            })
            .pipe(map(FlowViewProvider.mapSearchResponseToFlowViews))
            .toPromise();
    }

    private static mapSearchResponseToFlowViews(response: SearchResponse<any>): IFlowView[] {
        return response[0].hits.hits.map(hit => mapFlowEntityToView(hit._source));
    }
}
