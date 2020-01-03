import { useDispatch, useSelector } from 'react-redux';
import { TcpStatisticsDetailsSelectors } from 'root/statistics/selectors/details';
import { useCallback } from 'react';
import { TcpStatisticsDetailsActions } from 'root/statistics/actions/details';
import { StreamsRouterActions } from 'root/streams/actions/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';

export function useTcpStatisticsResponseDetailsDrawer() {
    const isOpened = useSelector(TcpStatisticsDetailsSelectors.responseDrawerOpened);
    const details = useSelector(TcpStatisticsDetailsSelectors.responseDetails);
    const loading = useSelector(TcpStatisticsDetailsSelectors.responseDetailsLoading);
    const responseIp = useSelector(TcpStatisticsDetailsSelectors.responseIp);
    const responseMac = useSelector(TcpStatisticsDetailsSelectors.responseMac);

    const dispatch = useDispatch();
    const close = useCallback(
        () => dispatch(TcpStatisticsDetailsActions.CloseResponseDrawer()),
        [ dispatch ]
    );

    const openStreamsAction = StreamsRouterActions.streamsList({
        transport: StreamsRouterTransport.Tcp,
    }, {
        query: {
            take: 15,
            current: 1,
            destinationIp: responseIp,
            destinationMac: responseMac,
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
