import React, { FC } from 'react';
import { Table } from 'antd';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { useStreamsList } from 'root/streams/components/list/tcp/hook';
import { TcpStreamsSearchForm } from 'root/streams/components/list/tcp/filter';

interface IProps {
}

export const TcpStreamsList: FC<IProps> = () => {
    const { columns, streams, loading, searchParamsModel, total, handleTableChange } = useStreamsList();
    const { current, take } = searchParamsModel;
    const getRowKey = ({ streamId }: ITcpStreamView) => streamId.toString();

    return (
        <>
            <TcpStreamsSearchForm/>
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
                    showQuickJumper: true,
                    pageSize: take,
                    current,
                    pageSizeOptions: [ '5', '15', '50', '200' ],
                    total,
                }}
            />
        </>
    );
};
