import { MessagesTabsEnum } from 'core/message/constants/router/tabs';
import { MessageRouterSelectors } from 'core/message/selectors/router';
import { useSelector } from 'react-redux';

export function useMessageSearchForm() {
    const tabName = useSelector(MessageRouterSelectors.tabName);
    const canFilterByStatus = tabName !== MessagesTabsEnum.DRAFTS;

    return {
        canFilterByStatus,
    }
}
