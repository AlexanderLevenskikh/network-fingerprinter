import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { StreamsRouterActions } from 'root/streams/actions/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { useTranslation } from 'react-i18next';
import { RouterSelectors } from 'root/router/selectors/router';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { SearchParamsModel } from 'root/shared/model/searchParams';
import { PlayerRouterActions } from 'root/player/actions/router';
import { StatisticsRouterActions, StatisticsRouterActionTypes } from 'root/statistics/actions/router';
import { TcpStatisticsTabsEnum } from 'root/statistics/constants/router/tab';
import { TcpStatisticsRouterSelectors } from 'root/statistics/selectors/router';

export function useHeaderMenu() {
    const page = useSelector(RouterSelectors.page);
    const transport = useSelector(StreamRouterSelectors.transport);
    const statisticsTabName = useSelector(TcpStatisticsRouterSelectors.tabName);

    const dispatch = useDispatch();
    const onClickTcpStreams = useCallback(
        () => dispatch(StreamsRouterActions.streamsList(
            { transport: StreamsRouterTransport.Tcp },
            { query: new SearchParamsModel() },
        )),
        [ dispatch ],
    );
    const onClickUdpStreams = useCallback(
        () => dispatch(StreamsRouterActions.streamsList(
            { transport: StreamsRouterTransport.Udp },
            { query: new SearchParamsModel() },
        )),
        [ dispatch ],
    );
    const onClickStatistics = useCallback(
        (tabName: TcpStatisticsTabsEnum) => dispatch(StatisticsRouterActions.Main(
            { tabName },
        )),
        [ dispatch ],
    );
    const onClickUpload = useCallback(
        () => dispatch(PlayerRouterActions.Upload()),
        [ dispatch ],
    );
    const { t } = useTranslation();

    return {
        page,
        transport,
        statisticsTabName,
        onClickTcpStreams,
        onClickUdpStreams,
        onClickStatistics,
        onClickUpload,
        t,
    }
}
