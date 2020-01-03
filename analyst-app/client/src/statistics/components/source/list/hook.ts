import { useDispatch, useSelector } from 'react-redux';
import { TcpStatisticsListSelectors } from 'root/statistics/selectors/list';
import { useEffect } from 'react';
import { TcpStatisticsListActions } from 'root/statistics/actions/list';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import { createTcpSourceStatisticsColumnsConfiguration } from 'root/statistics/components/source/list/columnConfiguration';

export function useTcpSourcesStatisticsList() {
    const sources = useSelector(TcpStatisticsListSelectors.sources);
    const loading = useSelector(TcpStatisticsListSelectors.sourcesLoading);

    const dispatch = useDispatch();
    useEffect(() => {
        if (dispatch) {
            dispatch(TcpStatisticsListActions.FetchSources());
        }
    }, [ dispatch ]);

    const { t } = useTranslation(I18nNamespace.statistics);
    const columns = createTcpSourceStatisticsColumnsConfiguration(t);

    return {
        sources,
        loading,
        columns,
    }
}
