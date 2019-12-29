import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { StreamsSearchActions } from 'root/streams/actions/search';

export function useTcpStreamsFilterFormFooter() {
    const dispatch = useDispatch();

    const closeSearch = useCallback(
        () => dispatch(StreamsSearchActions.close()),
        [ dispatch ],
    );
    const search = () => dispatch(StreamsSearchActions.search());

    return {
        closeSearch,
        search,
    }
}
