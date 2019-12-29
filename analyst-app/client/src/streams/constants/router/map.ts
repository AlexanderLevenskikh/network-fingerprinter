import { StreamsRouterActionTypes } from 'root/streams/actions/router';
import { RouterPages } from 'root/router/constants/pages';

export const streamsRoutesMap = {
    [ StreamsRouterActionTypes.StreamsList ]: `${RouterPages.Streams}/:transport`,
};
