import { MessageSearchActions } from 'core/message/actions/search';
import { MessagesSearchParamsModel } from 'core/message/model/searchParams';
import { MessageRouterSelectors } from 'core/message/selectors/router';
import { useSelector } from 'react-redux';
import { useLocalState } from 'shared/hooks/useLocalState';

export function useMessageSearchQuery() {
    const tabName = useSelector(MessageRouterSelectors.tabName);
    const selectQuery = (searchParams: MessagesSearchParamsModel) => searchParams.searchQuery;

    const createChangingAction = (searchParams: MessagesSearchParamsModel) =>
        MessageSearchActions.changeSearchParams({ searchParams });
    const [
        searchQuery,
        onChange,
        onBlur,
    ] = useLocalState(MessageRouterSelectors.searchParamsDraft, selectQuery, createChangingAction, 'searchQuery');

    return {
        tabName,
        searchQuery,
        onChange,
        onBlur,
    };
}
