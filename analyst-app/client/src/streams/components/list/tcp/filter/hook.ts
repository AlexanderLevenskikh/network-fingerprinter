import { useDispatch, useSelector } from 'react-redux';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { StreamsSearchActions } from 'root/streams/actions/search';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';

export function useTcpStreamsFilter() {
    const tcpStreamsSearchOpened = useSelector(StreamRouterSelectors.tcpStreamsSearchOpened);
    const dispatch = useDispatch();

    const toggleSearch = () => dispatch(
        tcpStreamsSearchOpened ? StreamsSearchActions.close() : StreamsSearchActions.open(),
    );
    const { t } = useTranslation(I18nNamespace.streams);

    return {
        t,
        tcpStreamsSearchOpened,
        toggleSearch,
    }
}
