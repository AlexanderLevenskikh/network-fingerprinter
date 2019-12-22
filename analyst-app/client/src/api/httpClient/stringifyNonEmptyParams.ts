import { IMap } from 'root/shared/types/iMap';
import { notEmpty } from 'root/shared/utils/notEmpty';
import { querySerializer } from 'root/shared/utils/querySerializer';

export function stringifyNonEmptyParams(searchParams: IMap<any>): string {
    const paramsKeys = Object.keys(searchParams);
    const nonEmptyParams = paramsKeys
        .filter(paramKey => notEmpty(searchParams[ paramKey ]))
        .reduce((result, paramKey) => ({
            ...result,
            [ paramKey ]: searchParams[ paramKey ],
        }), { });

    return stringifySearchParams(nonEmptyParams);
}

function stringifySearchParams(searchParams: { }): string {
    const searchString: string = querySerializer.stringify(searchParams);

    return `?${ searchString }`;
}
