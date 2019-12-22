import React, { FC, useCallback, useEffect, useState, Suspense } from 'react';
import Menu from 'antd/es/menu';
import { Layout } from 'antd';
import Icon from 'antd/es/icon';
import { useDispatch } from 'react-redux';
import { StreamsRouterActions } from 'root/streams/actions/router';
import { fetchWrapper, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';
import styles from './styles.less';
import { LanguageSelector } from 'root/shared/components/LanguageSelector';
import { useTranslation } from 'react-i18next';

interface IProps {
}

const { Sider, Header, Content } = Layout;

export const AppLayout: FC<IProps> = () => {
    const [ collapsed, setCollapsed ] = useState(false);
    const [ streams, setStreams ] = useState(null);
    const toggle = useCallback(
        () => setCollapsed(!collapsed),
        [ collapsed ]
    );
    const dispatch = useDispatch();
    const onClickStreams = useCallback(
        () => dispatch(StreamsRouterActions.streamsList()),
        [ dispatch ],
    );
    const { t, i18n } = useTranslation();

    useEffect(() => {
        fetchWrapper({
            controller: '/api/packet',
            action: '/list/tcp/streams',
            method: HttpClientMethod.GET,
            request: {},
            responseType: HttpClientResponseType.JSON,
        }).then(setStreams);
    }, []);

    return (
        <Layout>
            <Sider
                trigger={ null }
                collapsible
                collapsed={ collapsed }
                className={ styles.sider }
            >
                <div className={ styles.logo }>

                </div>
                <Icon
                    className={ styles.trigger }
                    type={ collapsed ? 'menu-unfold' : 'menu-fold' }
                    onClick={ toggle }
                />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={ onClickStreams }>
                        <Icon type="branches" />
                        <span>
                            { t('menuStreams') }
                        </span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Suspense fallback={null}>
                        <LanguageSelector/>
                    </Suspense>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    { JSON.stringify(streams) }
                </Content>
            </Layout>
        </Layout>
    );
};
