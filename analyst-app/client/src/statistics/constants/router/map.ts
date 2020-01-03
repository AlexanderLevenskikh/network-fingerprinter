import { StatisticsRouterActionTypes } from 'root/statistics/actions/router';
import { RouterPages } from 'root/router/constants/pages';

export const statisticsRoutesMap = {
    [ StatisticsRouterActionTypes.Main ]: `${RouterPages.Statistics}/:tabName`,
};
