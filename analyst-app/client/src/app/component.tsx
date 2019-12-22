import React, { FC } from 'react';
import 'antd/dist/antd.css';
import { AppLayout } from 'root/shared/components/layout/app';

export const App: FC = () => {
    return (
        <AppLayout/>
    );
};
App.displayName = 'App';
