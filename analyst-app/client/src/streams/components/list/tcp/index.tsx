import React, { FC } from 'react';
import { Table } from 'antd';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { useStreamsList } from 'root/streams/components/list/tcp/hook';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult } from 'antd/lib/table';

interface IProps {
}

export const TcpStreamsList: FC<IProps> = () => {
    const { columns, streams, loading } = useStreamsList();
    const getRowKey = ({ streamId }: ITcpStreamView) => streamId.toString();

    const handleTableChange = (
        pagination: PaginationConfig,
        filters: Record<keyof ITcpStreamView, string[]>,
        sorter: SorterResult<ITcpStreamView>,
    ) => {
    };

    return (
        <Table<ITcpStreamView>
            columns={ columns }
            rowKey={ getRowKey }
            dataSource={ streams }
            loading={ loading }
            size='middle'
            bordered
            onChange={ handleTableChange }
            pagination={{
                showSizeChanger: true,
                defaultCurrent: 1,
                pageSize: 4,
                showQuickJumper: true,
                pageSizeOptions: [ '10', '50', '200' ],
            }}
        />
    );
};
