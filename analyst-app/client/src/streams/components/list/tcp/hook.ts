import { useDispatch, useSelector } from 'react-redux';
import { StreamListSelectors } from 'root/streams/selectors/list';
import { useEffect } from 'react';
import { StreamsListActions } from 'root/streams/actions/list';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import { createColumnsConfiguration } from 'root/streams/components/list/tcp/columnConfiguration';

export function useStreamsList() {
    const streams = useSelector(StreamListSelectors.list);
    const loading = useSelector(StreamListSelectors.loading);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(StreamsListActions.FetchList());
    }, [ dispatch ]);
    const { t } = useTranslation(I18nNamespace.streams);
    const columns = createColumnsConfiguration(t);

    return {
        streams,
        columns,
        loading,
    }
}
