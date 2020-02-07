import * as userAgents from '../../../../../signatures/userAgents.json';

export const ja3SignaturesMap = userAgents.reduce((result, current) => {
    return {
        ...result,
        [ current.md5 ]: Array.isArray(result[current.md5]) ? [
            ...result[current.md5],
        ] : [ current['User-Agent'] ],
    }
}, { });
