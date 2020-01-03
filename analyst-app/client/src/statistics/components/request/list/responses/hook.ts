import { useDispatch, useSelector } from 'react-redux';
import { TcpStatisticsListSelectors } from 'root/statistics/selectors/list';
import { useCallback, useEffect } from 'react';
import { TcpStatisticsListActions } from 'root/statistics/actions/list';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { TcpStatisticsDetailsActions } from 'root/statistics/actions/details';
import { createTcpResponsesStatisticsColumnsConfiguration } from 'root/statistics/components/request/list/responses/columnConfiguration';

export function useTcpResponsesStatisticsList() {
    const sources = useSelector(TcpStatisticsListSelectors.responses);
    const loading = useSelector(TcpStatisticsListSelectors.responsesLoading);

    const dispatch = useDispatch();
    useEffect(() => {
        if (dispatch) {
            dispatch(TcpStatisticsListActions.FetchResponses());
        }
    }, [ dispatch ]);

    const openDrawer = useCallback(
        (view: ITcpHostStatisticsView) => dispatch(TcpStatisticsDetailsActions.OpenResponseDrawer({
            ip: view.ip,
            mac: view.mac,
        })),
        [ dispatch ],
    );

    const { t } = useTranslation(I18nNamespace.statistics);
    const columns = createTcpResponsesStatisticsColumnsConfiguration(t);

    return {
        sources,
        loading,
        columns,
        openDrawer,
    }
}
