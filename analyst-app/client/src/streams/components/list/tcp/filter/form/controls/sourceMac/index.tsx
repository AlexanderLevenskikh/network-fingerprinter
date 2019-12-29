import React, { FC } from 'react';
import { Input } from 'antd';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { useTcpStreamsFilterFormSourceMac } from 'root/streams/components/list/tcp/filter/form/controls/sourceMac/hook';

interface IProps {
}

export const TcpStreamsFilterFormSourceMac: FC<IProps> = () => {
    const { onChange, onBlur, sourceMac } = useTcpStreamsFilterFormSourceMac();

    return (
        <Input
            value={ sourceMac }
            onChange={ onChange }
            onBlur={ onBlur }
            className={ styles.input }
        />
    );
};

