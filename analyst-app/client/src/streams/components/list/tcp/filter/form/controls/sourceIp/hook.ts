import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { StreamsSearchActions } from 'root/streams/actions/search';
import { useLocalState } from 'root/shared/hooks/useLocalState';
import { StreamRouterSelectors } from 'root/streams/selectors/router';

export function useTcpStreamsFilterFormSourceIp() {
    const selectQuery = (searchParams: TcpStreamsSearchParamsModel) => searchParams.sourceIp;

    const createChangingAction = (model: TcpStreamsSearchParamsModel) =>
        StreamsSearchActions.changeSearchParams({ model });
    const [
        sourceIp,
        onChange,
        onBlur,
    ] = useLocalState(
        StreamRouterSelectors.tcpStreamsSearchParamsDraft,
        selectQuery,
        createChangingAction,
        'sourceIp',
    );

    return {
        sourceIp,
        onChange,
        onBlur,
    }
}
