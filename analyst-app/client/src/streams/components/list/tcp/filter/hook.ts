import { useDispatch, useSelector } from 'react-redux';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { StreamsSearchActions } from 'root/streams/actions/search';

export function useTcpStreamsFilter() {
    const tcpStreamsSearchOpened = useSelector(StreamRouterSelectors.tcpStreamsSearchOpened);
    const dispatch = useDispatch();

    const toggleSearch = () => dispatch(
        tcpStreamsSearchOpened ? StreamsSearchActions.close() : StreamsSearchActions.open(),
    );

    return {
        tcpStreamsSearchOpened,
        toggleSearch,
    }
}
