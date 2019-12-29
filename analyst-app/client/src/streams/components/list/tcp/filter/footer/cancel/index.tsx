import { useMessageSearchFormFooterCancel } from 'core/message/containers/list/search/footer/cancel/hook';
import React, { FC } from 'react';
import { Button } from 'shared/components/common/controls';

export const MessageSearchFormFooterCancelButtonContainer: FC = () => {
    const { cancel } = useMessageSearchFormFooterCancel();

    return (
        <Button onClick={ cancel }>
            Отменить поиск
        </Button>
    );
};
MessageSearchFormFooterCancelButtonContainer.displayName = 'MessageSearchFormFooterCancelButtonContainer';
