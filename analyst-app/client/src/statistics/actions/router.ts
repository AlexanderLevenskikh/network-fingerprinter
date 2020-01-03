import { createAction as csa } from 'typesafe-actions';
import { TcpStatisticsTabsEnum } from 'root/statistics/constants/router/tab';

export interface IStatisticsRouterMainActionPayload {
    tabName: TcpStatisticsTabsEnum;
}

export enum StatisticsRouterActionTypes {
    Main = 'statistics/router/main',
}

export const StatisticsRouterActions = {
    Main: csa(StatisticsRouterActionTypes.Main)<IStatisticsRouterMainActionPayload>(),
};
