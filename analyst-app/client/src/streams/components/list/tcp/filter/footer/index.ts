import { createMessageSearchFormFooter } from 'core/message/components/list/search/form/footer';
import { MessageSearchFormFooterCancelButtonContainer } from 'core/message/containers/list/search/footer/cancel';
import { MessageSearchFormFooterSearchButtonContainer } from 'core/message/containers/list/search/footer/search';

export const MessageSearchFormFooterContainer = createMessageSearchFormFooter(
    MessageSearchFormFooterSearchButtonContainer,
    MessageSearchFormFooterCancelButtonContainer,
);
