import { MessageSearchActions } from 'core/message/actions/search';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { validationContainerContext } from 'shared/hocs/validationContainer/context';

export function useMessageSearchFormFooterSearch() {
    const dispatch = useDispatch();
    const { validationContainer } = useContext(validationContainerContext);

    const search = useCallback(
        () => dispatch(MessageSearchActions.search({ validationContainer })),
        [ validationContainer, dispatch ],
    );

    return {
        search,
    }
}
