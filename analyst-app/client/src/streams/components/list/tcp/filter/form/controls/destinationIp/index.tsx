import React, { FC } from 'react';
import { Input } from 'antd';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { useTcpStreamsFilterFormDestinationIp } from 'root/streams/components/list/tcp/filter/form/controls/destinationIp/hook';

interface IProps {
}

export const TcpStreamsFilterFormDestinationIp: FC<IProps> = () => {
    const { onChange, onBlur, destinationIp } = useTcpStreamsFilterFormDestinationIp();

    return (
        <Input
            value={ destinationIp }
            onChange={ onChange }
            onBlur={ onBlur }
            className={ styles.input }
        />
    );
};

