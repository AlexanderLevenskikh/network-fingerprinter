import { SearchParamsModel } from 'root/shared/model/searchParams';

export function filterQuery(query: SearchParamsModel): SearchParamsModel {
    const baseQuery: SearchParamsModel = {
        current: 1,
        take: 15,
    };

    return Object.keys(query)
        .filter(key => query.hasOwnProperty(key))
        .reduce((result, currentKey: string) => {
            if (query[ currentKey ]) {
                return {
                    ...result,
                    [ currentKey ]: query[ currentKey ],
                };
            }

            return result;
        }, baseQuery);
}
