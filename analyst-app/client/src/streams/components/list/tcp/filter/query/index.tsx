import Input from '@skbkontur/react-ui/Input';
import { MessagesTabsEnum } from 'core/message/constants/router/tabs';
import { useMessageSearchQuery } from 'core/message/containers/list/search/query/hook';
import React, { FC } from 'react';
import { EnumMap } from 'shared/model/common/enumMap';

export const MessageSearchQueryContainer: FC = () => {
    const { tabName, onBlur, searchQuery, onChange } = useMessageSearchQuery();

    const placeholdersMap: EnumMap<MessagesTabsEnum, string> = {
        [MessagesTabsEnum.DRAFTS]: 'Поиск по получателям, теме, комментарию',
        [MessagesTabsEnum.OUTCOME]: 'Поиск по получателям, теме, комментарию',
        [MessagesTabsEnum.INCOME]: 'Поиск по отправителю, теме, комментарию',
    };
    const placeholder = placeholdersMap[tabName];

    return (
        <Input
            value={ searchQuery }
            placeholder={ placeholder }
            autoFocus
            width={ 501 }
            maxLength={ 1200 }
            onChange={ onChange }
            onBlur={ onBlur }
        />
    );
};
MessageSearchQueryContainer.displayName = 'MessageSearchQueryContainer';
