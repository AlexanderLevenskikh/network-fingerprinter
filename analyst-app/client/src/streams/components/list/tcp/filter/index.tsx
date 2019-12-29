import React, { FC } from 'react';
import { Button, Col, Form, Input, PageHeader, Row } from 'antd';
import styles from './styles.less';
import { useTcpStreamsFilter } from 'root/streams/components/list/tcp/filter/hook';
import { TcpStreamsFilterForm } from 'root/streams/components/list/tcp/filter/form';



export const TcpStreamsFilter: FC = () => {
    const { toggleSearch, tcpStreamsSearchOpened } = useTcpStreamsFilter();

    return (
        <div className={ styles.wrapper }>
            <PageHeader
                ghost={false}
                className={ styles.header }
                title="TCP потоки"
                extra={[
                    <Button
                        type='link'
                        icon='search'
                        onClick={ toggleSearch }
                    >
                        Поиск
                    </Button>
                ]}
            />

            { tcpStreamsSearchOpened && (
                <TcpStreamsFilterForm/>
            )}
        </div>
    );
};
