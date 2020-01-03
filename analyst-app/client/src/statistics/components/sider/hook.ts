import { useDispatch, useSelector } from 'react-redux';
import { TcpStatisticsRouterSelectors } from 'root/statistics/selectors/router';
import { useCallback } from 'react';
import { TcpStatisticsTabsEnum } from 'root/statistics/constants/router/tab';
import { StatisticsRouterActions } from 'root/statistics/actions/router';
import { useTranslation } from 'react-i18next';

export function useStatisticsSider() {
    const statisticsTabName = useSelector(TcpStatisticsRouterSelectors.tabName);

    const dispatch = useDispatch();
    const onClickStatistics = useCallback(
        (tabName: TcpStatisticsTabsEnum) => dispatch(StatisticsRouterActions.Main(
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
