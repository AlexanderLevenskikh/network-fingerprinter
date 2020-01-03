import React, { FC, Suspense } from 'react';
import 'antd/dist/antd.css';
import { AppLayout } from 'root/shared/components/AppLayout';
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import enUS from 'antd/es/locale/en_US';
import ruRu from 'antd/es/locale/ru_RU';
import { Languages } from 'root/shared/constants/languages';
import { useSelector } from 'react-redux';
import { RouterSelectors } from 'root/router/selectors/router';
import { RouterPages } from 'root/router/constants/pages';
import { StreamsPage } from 'root/streams/components';
import { PlayerPage } from 'root/player/components';
import { StatisticsPage } from 'root/statistics/components';

export const App: FC = () => {
    const page = useSelector(RouterSelectors.page);
    const isStreamsPage = page === RouterPages.Streams;
    const isStatisticsPage = page === RouterPages.Statistics;
    const isUploadPage = page === RouterPages.Player;

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
                <AppLayout>
                    { isStreamsPage && (
                        <StreamsPage />
                    )}
                    { isStatisticsPage && (
                        <StatisticsPage />
                    )}
                    { isUploadPage && (
                        <PlayerPage />
                    )}
                </AppLayout>
            </Suspense>
        </ConfigProvider>
    );
};
App.displayName = 'App';
