import React, { FC } from 'react';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { Table } from 'antd';
import { ITcpSourceStatisticsView } from 'DAL/Statistics/Tcp/ITcpSourceStatisticsView';
import { useTcpSourcesStatisticsList } from 'root/statistics/components/source/list/hook';

interface IProps {
}

export const TcpSourcesStatisticsList: FC<IProps> = () => {
    const { columns, loading, sources } = useTcpSourcesStatisticsList();
    const getRowKey = ({ ip, mac }: ITcpSourceStatisticsView) => `${ip}:${mac}`;

    return (
        <Table<ITcpSourceStatisticsView>
            columns={ columns }
            rowKey={ getRowKey }
            dataSource={ sources }
            loading={ loading }
            size='small'
            onRowClick={ (record, index, event) => console.log(record, index) }
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
