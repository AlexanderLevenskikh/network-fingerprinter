import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { StreamsSearchActions } from 'root/streams/actions/search';
import { useLocalState } from 'root/shared/hooks/useLocalState';
import { StreamRouterSelectors } from 'root/streams/selectors/router';

export function useTcpStreamsFilterFormDestinationIp() {
    const selectQuery = (searchParams: TcpStreamsSearchParamsModel) => searchParams.destinationIp;

    const createChangingAction = (model: TcpStreamsSearchParamsModel) =>
        StreamsSearchActions.changeSearchParams({ model });
    const [
        destinationIp,
        onChange,
        onBlur,
    ] = useLocalState(
        StreamRouterSelectors.tcpStreamsSearchParamsDraft,
        selectQuery,
        createChangingAction,
        'destinationIp',
    );

    return {
        destinationIp,
        onChange,
        onBlur,
    }
}
