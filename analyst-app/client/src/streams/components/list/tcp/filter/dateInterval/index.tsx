import { MessageSearchDates } from 'core/message/components/list/search/form/dateInterval';
import { MessagesTabsEnum } from 'core/message/constants/router/tabs';
import { useMessageSearchDateInterval } from 'core/message/containers/list/search/dateInterval/hook';
import React, { FC } from 'react';
import { EnumMap } from 'shared/model/common/enumMap';

export const MessageSearchDateIntervalContainer: FC = () => {
    const {
        tabName, endDate, startDate, endDateValidationInfo, onChangeEndDate,
        onChangeStartDate, resetDates, startDateValidationInfo,
    } = useMessageSearchDateInterval();

    const dropdownCaptionMap: EnumMap<MessagesTabsEnum, string> = {
        [MessagesTabsEnum.INCOME]: 'Дата получения сообщения',
        [MessagesTabsEnum.OUTCOME]: 'Дата отправки сообщения',
        [MessagesTabsEnum.DRAFTS]: 'Дата создания сообщения',
    };
    const dropdownCaption = dropdownCaptionMap[tabName];

    return (
        <MessageSearchDates
            dropdownCaption={ dropdownCaption }
            startDate={ startDate }
            endDate={ endDate }
            startDateValidationInfo={ startDateValidationInfo }
            endDateValidationInfo={ endDateValidationInfo }
            onChangeStartDate={ onChangeStartDate }
            onChangeEndDate={ onChangeEndDate }
            resetDates={ resetDates }
        />
    );
};
MessageSearchDateIntervalContainer.displayName = 'MessageSearchDateIntervalContainer';
