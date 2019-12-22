import React, { FC, Suspense } from 'react';
import 'antd/dist/antd.css';
import { AppLayout } from 'root/shared/components/AppLayout';

export const App: FC = () => {
    return (
        <Suspense fallback={ null } >
            <AppLayout/>
        </Suspense>
    );
};
App.displayName = 'App';
