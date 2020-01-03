import { createAction as csa } from 'typesafe-actions';
import { StatisticsTabsEnum } from 'root/statistics/constants/router/tab';

export interface IStatisticsRouterMainActionPayload {
    tabName: StatisticsTabsEnum;
}

export enum StatisticsRouterActionTypes {
    Main = 'statistics/router/main',
}

export const StatisticsRouterActions = {
    Main: csa(StatisticsRouterActionTypes.Main)<IStatisticsRouterMainActionPayload>(),
};
