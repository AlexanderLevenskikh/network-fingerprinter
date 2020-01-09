import React, { FC } from 'react';
import { Input } from 'antd';
import styles from 'root/streams/components/list/tcp/filter/styles.less';
import { useTcpStreamsFilterFormSensorId } from 'root/streams/components/list/tcp/filter/form/controls/sensorId/hook';

interface IProps {
}

export const TcpStreamsFilterFormSensorId: FC<IProps> = () => {
    const { onChange, onBlur, sensorId } = useTcpStreamsFilterFormSensorId();

    return (
        <Input
            value={ sensorId }
            onChange={ onChange }
            onBlur={ onBlur }
            className={ styles.input }
        />
    );
};

