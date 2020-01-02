import { createAction as csa } from 'typesafe-actions';

export enum PlayerRouterActionTypes {
    Upload = 'player/router/upload',
}

export const PlayerRouterActions = {
    Upload: csa(PlayerRouterActionTypes.Upload)(),
};
