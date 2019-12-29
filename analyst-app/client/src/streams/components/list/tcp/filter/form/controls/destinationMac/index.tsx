import React, { FC } from 'react';
import { Input } from 'antd';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { useTcpStreamsFilterFormDestinationMac } from 'root/streams/components/list/tcp/filter/form/controls/destinationMac/hook';

interface IProps {
}

export const TcpStreamsFilterFormDestinationMac: FC<IProps> = () => {
    const { onChange, onBlur, destinationMac } = useTcpStreamsFilterFormDestinationMac();

    return (
        <Input
            value={ destinationMac }
            onChange={ onChange }
            onBlur={ onBlur }
            className={ styles.input }
        />
    );
};

