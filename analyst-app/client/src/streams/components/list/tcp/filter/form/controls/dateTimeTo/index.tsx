import React, { FC } from 'react';
import { DatePicker } from 'antd';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { useTcpStreamsFilterFormDateTimeTo } from 'root/streams/components/list/tcp/filter/form/controls/dateTimeTo/hook';

interface IProps {
}

export const TcpStreamsFilterFormDateTimeTo: FC<IProps> = () => {
    const { onChange, dateTimeTo } = useTcpStreamsFilterFormDateTimeTo();
    const dateFormat = 'DD-MM-YYYY';

    return (
        <DatePicker
            value={ dateTimeTo }
            onChange={ onChange }
            className={ styles.input }
            format={ dateFormat }
        />
    );
};

