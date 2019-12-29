import { DateTimeService } from 'root/shared/utils/dateTime/DateTimeService';
import React from 'react';

export function renderStreamDateTime(dateTime: string) {
    const dateTimeStr = DateTimeService.isoDateToDateTimeString(dateTime);

    return (
        <span>
            { dateTimeStr }
        </span>
    );
}
