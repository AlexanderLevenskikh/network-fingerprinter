import { useMessageSearchFormFooterSearch } from 'core/message/containers/list/search/footer/search/hook';
import React, { FC } from 'react';
import { Button } from 'shared/components/common/controls';

export const MessageSearchFormFooterSearchButtonContainer: FC = () => {
    const { search } = useMessageSearchFormFooterSearch();

    return (
        <Button
            type='submit'
            use='primary'
            onClick={ search }
        >
            Найти
        </Button>
    );
};
MessageSearchFormFooterSearchButtonContainer.displayName = 'MessageSearchFormFooterSearchButtonContainer';
