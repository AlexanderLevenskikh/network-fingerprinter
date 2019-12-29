import React, { FC } from 'react';
import { Button } from 'antd';
import { useTcpStreamsFilterFormFooter } from 'root/streams/components/list/tcp/filter/form/footer/hook';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';

interface IProps {
}

export const TcpStreamsFilterFormFooter: FC<IProps> = () => {
    const { t, closeSearch, search } = useTcpStreamsFilterFormFooter();

    return (
        <>
            <Button
                onClick={ search }
                type='primary'
                htmlType='submit'
                icon='search'
            >
                { t(I18StreamsNsKeys.filterSearchButtonLabel) }
            </Button>
            <Button
                style={{ marginLeft: 8 }}
                onClick={ closeSearch }
            >
                { t(I18StreamsNsKeys.filterCancelSearchButtonLabel) }
            </Button>
        </>
    );
};

