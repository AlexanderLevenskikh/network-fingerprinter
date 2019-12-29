import { MessageSearchActions } from 'core/message/actions/search';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useMessageSearchFormFooterCancel() {
    const dispatch = useDispatch();

    const cancel = useCallback(
        () => dispatch(MessageSearchActions.close()),
        [ dispatch ],
    );

    return {
        cancel,
    }
}
