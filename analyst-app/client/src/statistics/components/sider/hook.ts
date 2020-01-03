import { useDispatch, useSelector } from 'react-redux';
import { StatisticsRouterSelectors } from 'root/statistics/selectors/router';
import { useCallback } from 'react';
import { StatisticsTabsEnum } from 'root/statistics/constants/router/tab';
import { StatisticsRouterActions } from 'root/statistics/actions/router';
import { useTranslation } from 'react-i18next';

export function useStatisticsSider() {
    const statisticsTabName = useSelector(StatisticsRouterSelectors.tabName);

    const dispatch = useDispatch();
    const onClickStatistics = useCallback(
        (tabName: StatisticsTabsEnum) => dispatch(StatisticsRouterActions.Main(
            { tabName },
        )),
        [ dispatch ],
    );
    const { t } = useTranslation();

    return {
        statisticsTabName,
        onClickStatistics,
        t,
    }
}
