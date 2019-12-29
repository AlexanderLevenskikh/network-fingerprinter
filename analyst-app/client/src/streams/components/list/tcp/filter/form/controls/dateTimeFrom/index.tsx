import React, { FC } from 'react';
import { DatePicker } from 'antd';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { useTcpStreamsFilterFormDateTimeFrom } from 'root/streams/components/list/tcp/filter/form/controls/dateTimeFrom/hook';

interface IProps {
}

export const TcpStreamsFilterFormDateTimeFrom: FC<IProps> = () => {
    const { onChange, dateTimeFrom } = useTcpStreamsFilterFormDateTimeFrom();
    const dateFormat = 'DD-MM-YYYY';

    return (
        <DatePicker
            value={ dateTimeFrom }
            onChange={ onChange }
            className={ styles.input }
            format={ dateFormat }
        />
    );
};

