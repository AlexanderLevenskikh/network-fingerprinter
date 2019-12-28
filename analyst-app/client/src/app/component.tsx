import React, { FC, Suspense } from 'react';
import 'antd/dist/antd.css';
import { AppLayout } from 'root/shared/components/AppLayout';
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import enUS from 'antd/es/locale/en_US';
import ruRu from 'antd/es/locale/ru_RU';
import { Languages } from 'root/shared/constants/languages';

export const App: FC = () => {
    const { i18n } = useTranslation();
    let locale;
    switch (i18n.language) {
        case Languages.ru:
            locale = ruRu;
            break;
        case Languages.us:
        default:
            locale = enUS;
    }

    return (
        <ConfigProvider locale={ locale }>
            <Suspense fallback={ null }>
                <AppLayout/>
            </Suspense>
        </ConfigProvider>
    );
};
App.displayName = 'App';
