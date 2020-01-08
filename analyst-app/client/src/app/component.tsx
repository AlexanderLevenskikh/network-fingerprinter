import React, { FC, Suspense, useEffect } from 'react';
import 'antd/dist/antd.css';
import { AppLayout } from 'root/shared/components/AppLayout';
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import enUS from 'antd/es/locale/en_US';
import ruRu from 'antd/es/locale/ru_RU';
import { Languages } from 'root/shared/constants/languages';
import { useDispatch, useSelector } from 'react-redux';
import { RouterSelectors } from 'root/router/selectors/router';
import { RouterPages } from 'root/router/constants/pages';
import { StreamsPage } from 'root/streams/components';
import { PlayerPage } from 'root/player/components';
import { StatisticsPage } from 'root/statistics/components';
import { StreamsListActions } from 'root/streams/actions/list';
import { StreamsSearchActions } from 'root/streams/actions/search';
import { UserActions } from 'root/user/actions';
import { UserRegistration } from 'root/user/components/registration';

export const App: FC = () => {
    const page = useSelector(RouterSelectors.page);
    const isStreamsPage = page === RouterPages.Streams;
    const isStatisticsPage = page === RouterPages.Statistics;
    const isUploadPage = page === RouterPages.Player;

    const dispatch = useDispatch();
    useEffect(() => {
        if (dispatch) {
            dispatch(UserActions.FetchCurrentUser());
        }
    }, [ dispatch ]);

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
                    <UserRegistration />
                </AppLayout>
            </Suspense>
        </ConfigProvider>
    );
};
App.displayName = 'App';
