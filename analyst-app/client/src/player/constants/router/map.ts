import { RouterPages } from 'root/router/constants/pages';
import { PlayerRouterActionTypes } from 'root/player/actions/router';

export const playerRoutesMap = {
    [ PlayerRouterActionTypes.Upload ]: `${RouterPages.Player}/upload`,
};
