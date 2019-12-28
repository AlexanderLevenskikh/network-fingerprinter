import React, { FC } from 'react';
import { Table } from 'antd';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { useStreamsList } from 'root/streams/components/list/hook';

interface IProps {
}

export const StreamsList: FC<IProps> = () => {
    const { columns, streams, loading } = useStreamsList();
    const getRowKey = ({ streamId }: ITcpStreamView) => streamId.toString();

    return (
        <Table<ITcpStreamView>
            columns={ columns }
            rowKey={ getRowKey }
            dataSource={ streams }
            loading={ loading }
            size='middle'
            bordered
        />
    );
};
