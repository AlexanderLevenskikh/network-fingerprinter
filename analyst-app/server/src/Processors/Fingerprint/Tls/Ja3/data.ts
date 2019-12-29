import * as userAgents from './userAgents.json';

export const ja3SignaturesMap = userAgents.reduce((result, current) => {
    return {
        ...result,
        [ current.md5 ]: current['User-Agent'],
    }
}, { });
