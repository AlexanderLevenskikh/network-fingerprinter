import React, { FC } from 'react';
import { Input } from 'antd';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { useTcpStreamsFilterFormSourcePort } from 'root/streams/components/list/tcp/filter/form/controls/sourcePort/hook';

interface IProps {
}

export const TcpStreamsFilterFormSourcePort: FC<IProps> = () => {
    const { onChange, onBlur, sourcePort } = useTcpStreamsFilterFormSourcePort();

    return (
        <Input
            value={ sourcePort }
            onChange={ onChange }
            onBlur={ onBlur }
            className={ styles.input }
        />
    );
};

