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
import { I18MainNsKeys } from 'root/i18n/resources/main/keys';

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
            <Header className={ styles.header }>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item
                        key="1"
                        onClick={ onClickStreams }
                    >
                        <Icon type="branches" />
                        <span>
                            { t(I18MainNsKeys.menuStreamsLabel) }
                        </span>
                    </Menu.Item>
                </Menu>
                <Suspense fallback={null}>
                    <LanguageSelector/>
                </Suspense>
            </Header>
            <Layout>
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
