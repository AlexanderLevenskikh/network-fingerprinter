import React, { FC } from 'react';
import { Button } from 'antd';
import { useTcpStreamsFilterFormFooter } from 'root/streams/components/list/tcp/filter/form/footer/hook';

interface IProps {
}

export const TcpStreamsFilterFormFooter: FC<IProps> = () => {
    const { closeSearch, search } = useTcpStreamsFilterFormFooter();

    return (
        <>
            <Button
                onClick={ search }
                type='primary'
                htmlType='submit'
                icon='search'
            >
                Поиск
            </Button>
            <Button
                style={{ marginLeft: 8 }}
                onClick={ closeSearch }
            >
                Отмена
            </Button>
        </>
    );
};

