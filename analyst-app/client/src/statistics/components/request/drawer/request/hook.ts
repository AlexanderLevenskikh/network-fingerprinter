import { useDispatch, useSelector } from 'react-redux';
import { TcpStatisticsDetailsSelectors } from 'root/statistics/selectors/details';
import { useCallback } from 'react';
import { TcpStatisticsDetailsActions } from 'root/statistics/actions/details';
import { StreamsRouterActions } from 'root/streams/actions/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';

export function useTcpStatisticsRequestDetailsDrawer() {
    const isOpened = useSelector(TcpStatisticsDetailsSelectors.requestDrawerOpened);
    const details = useSelector(TcpStatisticsDetailsSelectors.requestDetails);
    const loading = useSelector(TcpStatisticsDetailsSelectors.requestDetailsLoading);
    const requestIp = useSelector(TcpStatisticsDetailsSelectors.requestIp);
    const requestMac = useSelector(TcpStatisticsDetailsSelectors.requestMac);

    const dispatch = useDispatch();
    const close = useCallback(
        () => dispatch(TcpStatisticsDetailsActions.CloseRequestDrawer()),
        [ dispatch ]
    );

    const openStreamsAction = StreamsRouterActions.streamsList({
        transport: StreamsRouterTransport.Tcp,
    }, {
        query: {
            take: 15,
            current: 1,
            sourceIp: requestIp,
            sourceMac: requestMac,
        }
    });

    const { t } = useTranslation(I18nNamespace.statistics);

    return {
        isOpened,
        details,
        loading,
        close,
        openStreamsAction,
        t,
    }
}
