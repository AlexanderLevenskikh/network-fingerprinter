import { streamsRoutesMap } from 'root/streams/constants/router/map';
import { playerRoutesMap } from 'root/player/constants/router/map';

export const routesMap = {
    ...streamsRoutesMap,
    ...playerRoutesMap,
};
