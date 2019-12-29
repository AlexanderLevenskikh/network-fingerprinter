import { SearchParamsModel } from 'root/shared/model/searchParams';
import { querySerializer } from 'root/shared/utils/querySerializer';

export function areQueryParamsEqual(first: SearchParamsModel, second: SearchParamsModel) {
    const firstSerialized = querySerializer.stringify(first);
    const secondSerialized = querySerializer.stringify(second);

    return firstSerialized === secondSerialized;
}
