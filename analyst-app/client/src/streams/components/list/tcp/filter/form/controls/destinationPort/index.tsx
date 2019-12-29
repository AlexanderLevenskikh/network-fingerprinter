import React, { FC } from 'react';
import { Input } from 'antd';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { useTcpStreamsFilterFormDestinationPort } from 'root/streams/components/list/tcp/filter/form/controls/destinationPort/hook';

interface IProps {
}

export const TcpStreamsFilterFormDestinationPort: FC<IProps> = () => {
    const { onChange, onBlur, destinationPort } = useTcpStreamsFilterFormDestinationPort();

    return (
        <Input
            value={ destinationPort }
            onChange={ onChange }
            onBlur={ onBlur }
            className={ styles.input }
        />
    );
};

