import React, { FC, Suspense } from 'react';
import { Layout } from 'antd';
import styles from './styles.less';
import { LanguageSelector } from 'root/shared/components/LanguageSelector';
import { HeaderMenu } from 'root/shared/components/HeaderMenu';

const { Header, Content } = Layout;

export const AppLayout: FC = ({ children }) => {
    return (
        <Layout>
            <Header className={ styles.header }>
                <HeaderMenu />
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
                    { children }
                </Content>
            </Layout>
        </Layout>
    );
};
