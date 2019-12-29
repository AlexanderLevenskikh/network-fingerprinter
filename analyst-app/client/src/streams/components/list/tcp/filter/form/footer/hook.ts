import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { StreamsSearchActions } from 'root/streams/actions/search';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';

export function useTcpStreamsFilterFormFooter() {
    const dispatch = useDispatch();

    const closeSearch = useCallback(
        () => dispatch(StreamsSearchActions.close()),
        [ dispatch ],
    );
    const search = () => dispatch(StreamsSearchActions.search());
    const { t } = useTranslation(I18nNamespace.streams);

    return {
        t,
        closeSearch,
        search,
    }
}
