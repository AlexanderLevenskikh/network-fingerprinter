import React, { FC } from 'react';
import { Drawer } from 'antd';

interface IProps {
}

export const TcpStatisticsSourceDetailsDrawer: FC<IProps> = () => {
    return (
        <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
        >

        </Drawer>
    );
}
