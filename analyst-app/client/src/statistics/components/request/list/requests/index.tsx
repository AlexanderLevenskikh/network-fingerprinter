import React, { FC } from 'react';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { Table } from 'antd';
import { ITcpHostStatisticsView } from 'DAL/Statistics/Tcp/ITcpHostStatisticsView';
import { useTcpRequestsStatisticsList } from 'root/statistics/components/request/list/requests/hook';

interface IProps {
}

export const TcpRequestsStatisticsList: FC<IProps> = () => {
    const { columns, loading, sources, openDrawer } = useTcpRequestsStatisticsList();
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
