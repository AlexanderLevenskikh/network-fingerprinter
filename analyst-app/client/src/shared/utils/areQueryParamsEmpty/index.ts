import { querySerializer } from 'shared/utils/querySerializer';
import { SearchParamsModel } from 'root/shared/model/searchParams';

export function areQueryParamsEmpty(params: SearchParamsModel) {
    const pagingParams = new SearchParamsModel(params.current, params.take);
    const paramsSerialized = querySerializer.stringify(params);
    const pagingParamsSerialized = querySerializer.stringify(pagingParams);

    return paramsSerialized === pagingParamsSerialized;
}
