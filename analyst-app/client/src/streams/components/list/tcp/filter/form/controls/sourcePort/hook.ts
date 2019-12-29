import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { StreamsSearchActions } from 'root/streams/actions/search';
import { useLocalState } from 'root/shared/hooks/useLocalState';
import { StreamRouterSelectors } from 'root/streams/selectors/router';

export function useTcpStreamsFilterFormSourcePort() {
    const selectQuery = (searchParams: TcpStreamsSearchParamsModel) => searchParams.sourcePort;

    const createChangingAction = (model: TcpStreamsSearchParamsModel) =>
        StreamsSearchActions.changeSearchParams({ model });
    const [
        sourcePort,
        onChange,
        onBlur,
    ] = useLocalState(
        StreamRouterSelectors.tcpStreamsSearchParamsDraft,
        selectQuery,
        createChangingAction,
        'sourcePort',
    );

    return {
        sourcePort,
        onChange,
        onBlur,
    }
}
