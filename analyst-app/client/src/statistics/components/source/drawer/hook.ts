import { useDispatch, useSelector } from 'react-redux';
import { TcpStatisticsDetailsSelectors } from 'root/statistics/selectors/details';
import { useCallback } from 'react';
import { TcpStatisticsDetailsActions } from 'root/statistics/actions/details';
import { StreamsRouterActions } from 'root/streams/actions/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';

export function useTcpStatisticsSourceDetailsDrawer() {
    const isOpened = useSelector(TcpStatisticsDetailsSelectors.sourceDrawerOpened);
    const details = useSelector(TcpStatisticsDetailsSelectors.sourceDetails);
    const loading = useSelector(TcpStatisticsDetailsSelectors.sourceDetailsLoading);
    const sourceIp = useSelector(TcpStatisticsDetailsSelectors.sourceIp);
    const sourceMac = useSelector(TcpStatisticsDetailsSelectors.sourceMac);

    const dispatch = useDispatch();
    const close = useCallback(
        () => dispatch(TcpStatisticsDetailsActions.CloseSourceDrawer()),
        [ dispatch ]
    );

    const openStreamsAction = StreamsRouterActions.streamsList({
        transport: StreamsRouterTransport.Tcp,
    }, {
        query: {
            take: 15,
            current: 1,
            sourceIp,
            sourceMac,
        }
    });

    return {
        isOpened,
        details,
        loading,
        close,
        openStreamsAction,
    }
}
