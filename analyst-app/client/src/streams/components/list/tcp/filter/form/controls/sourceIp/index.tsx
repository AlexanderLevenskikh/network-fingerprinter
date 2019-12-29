import React, { FC } from 'react';
import { Form, Input } from 'antd';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { useTcpStreamsFilterFormSourceIp } from 'root/streams/components/list/tcp/filter/form/controls/sourceIp/hook';

interface IProps {
}

export const TcpStreamsFilterFormSourceIp: FC<IProps> = () => {
    const { onChange, onBlur, sourceIp } = useTcpStreamsFilterFormSourceIp();

    return (
        <Input
            value={ sourceIp }
            onChange={ onChange }
            onBlur={ onBlur }
            className={ styles.input }
        />
    );
};

