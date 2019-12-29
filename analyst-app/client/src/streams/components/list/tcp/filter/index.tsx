import React, { FC } from 'react';
import { Button, Col, Form, Input, PageHeader, Row } from 'antd';
import styles from './styles.less';
import { useTcpStreamsFilter } from 'root/streams/components/list/tcp/filter/hook';
import { TcpStreamsFilterForm } from 'root/streams/components/list/tcp/filter/form';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';



export const TcpStreamsFilter: FC = () => {
    const { t, toggleSearch, tcpStreamsSearchOpened } = useTcpStreamsFilter();

    return (
        <div className={ styles.wrapper }>
            <PageHeader
                ghost={false}
                className={ styles.header }
                title={ t(I18StreamsNsKeys.listTcpHeader) }
                extra={[
                    <Button
                        type='link'
                        icon='search'
                        onClick={ toggleSearch }
                    >
                        { t(I18StreamsNsKeys.filterSearchButtonLabel) }
                    </Button>
                ]}
            />

            { tcpStreamsSearchOpened && (
                <TcpStreamsFilterForm/>
            )}
        </div>
    );
};
