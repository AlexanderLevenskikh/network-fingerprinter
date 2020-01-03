import { useDispatch, useSelector } from 'react-redux';
import { TcpStatisticsListSelectors } from 'root/statistics/selectors/list';
import { useCallback, useEffect } from 'react';
import { TcpStatisticsListActions } from 'root/statistics/actions/list';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import { createTcpRequestsStatisticsColumnsConfiguration } from 'root/statistics/components/request/list/requests/columnConfiguration';
import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { TcpStatisticsDetailsActions } from 'root/statistics/actions/details';

export function useTcpRequestsStatisticsList() {
    const sources = useSelector(TcpStatisticsListSelectors.requests);
    const loading = useSelector(TcpStatisticsListSelectors.requestsLoading);

    const dispatch = useDispatch();
    useEffect(() => {
        if (dispatch) {
            dispatch(TcpStatisticsListActions.FetchRequests());
        }
    }, [ dispatch ]);

    const openDrawer = useCallback(
        (view: ITcpHostStatisticsView) => dispatch(TcpStatisticsDetailsActions.OpenRequestDrawer({
            ip: view.ip,
            mac: view.mac,
        })),
        [ dispatch ],
    );

    const { t } = useTranslation(I18nNamespace.statistics);
    const columns = createTcpRequestsStatisticsColumnsConfiguration(t);

    return {
        sources,
        loading,
        columns,
        openDrawer,
    }
}
