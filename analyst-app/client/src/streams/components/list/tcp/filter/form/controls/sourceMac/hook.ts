import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { StreamsSearchActions } from 'root/streams/actions/search';
import { useLocalState } from 'root/shared/hooks/useLocalState';
import { StreamRouterSelectors } from 'root/streams/selectors/router';

export function useTcpStreamsFilterFormSourceMac() {
    const selectQuery = (searchParams: TcpStreamsSearchParamsModel) => searchParams.sourceMac;

    const createChangingAction = (model: TcpStreamsSearchParamsModel) =>
        StreamsSearchActions.changeSearchParams({ model });
    const [
        sourceMac,
        onChange,
        onBlur,
    ] = useLocalState(
        StreamRouterSelectors.tcpStreamsSearchParamsDraft,
        selectQuery,
        createChangingAction,
        'sourceMac',
    );

    return {
        sourceMac,
        onChange,
        onBlur,
    }
}
