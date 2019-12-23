import React, { FC, Suspense, useCallback, useState } from 'react';
import Menu from 'antd/es/menu';
import { Layout } from 'antd';
import Icon from 'antd/es/icon';
import { useDispatch } from 'react-redux';
import { StreamsRouterActions } from 'root/streams/actions/router';
import styles from './styles.less';
import { LanguageSelector } from 'root/shared/components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { StreamsList } from 'root/streams/components/list';

interface IProps {
}

const { Sider, Header, Content } = Layout;

export const AppLayout: FC<IProps> = () => {
    const [ collapsed, setCollapsed ] = useState(false);
    const toggle = useCallback(
        () => setCollapsed(!collapsed),
        [ collapsed ]
    );
    const dispatch = useDispatch();
    const onClickStreams = useCallback(
        () => dispatch(StreamsRouterActions.streamsList()),
        [ dispatch ],
    );
    const { t } = useTranslation();

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
                            { t('menuStreamsLabel') }
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
                    <StreamsList/>
                </Content>
            </Layout>
        </Layout>
    );
};
