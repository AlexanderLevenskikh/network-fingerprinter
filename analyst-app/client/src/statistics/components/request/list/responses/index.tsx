import React, { FC } from 'react';
import { Table } from 'antd';
import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { useTcpResponsesStatisticsList } from 'root/statistics/components/request/list/responses/hook';

interface IProps {
}

export const TcpResponsesStatisticsList: FC<IProps> = () => {
    const { columns, loading, sources, openDrawer } = useTcpResponsesStatisticsList();
    const getRowKey = ({ ip, mac }: ITcpHostStatisticsView) => `${ip}:${mac}`;

    return (
        <Table<ITcpHostStatisticsView>
            columns={ columns }
            rowKey={ getRowKey }
            dataSource={ sources }
            loading={ loading }
            size='small'
            onRowClick={ openDrawer }
            pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                defaultCurrent: 1,
                defaultPageSize: 15,
                pageSizeOptions: [ '5', '15', '50', '200' ],
                total: sources.length,
            }}
        />
    );
};
