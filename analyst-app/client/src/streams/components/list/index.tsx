import React, { FC, useEffect, useState } from 'react';
import { Table } from 'antd';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { useDispatch, useSelector } from 'react-redux';
import { StreamsListActions } from 'root/streams/actions/list';
import { StreamListSelectors } from 'root/streams/selectors/list';

interface IProps {
}

const columns = [
    {
        title: 'Fingerprint',
        dataIndex: 'os',
        sorter: true,
        width: '20%',
    },
    {
        title: 'SYN',
        dataIndex: 'syn',
        sorter: true,
        render: syn => `${syn?.ip.sourceIp}:${syn?.tcp.sourcePort} - ${syn?.ip.destinationIp}:${syn?.tcp.destinationPort}`,
        width: '20%',
    },
    {
        title: 'SYN+ACK',
        dataIndex: 'synAck',
        sorter: true,
        render: synAck => `${synAck?.ip.sourceIp}:${synAck?.tcp.sourcePort} - ${synAck?.ip.destinationIp}:${synAck?.tcp.destinationPort}`,
        width: '20%',
    },
];

export const StreamsList: FC<IProps> = () => {
    const streams = useSelector(StreamListSelectors.list);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(StreamsListActions.FetchList());
    }, [ dispatch ]);

    return (
        <Table<ITcpStreamView>
            columns={ columns }
            rowKey={record => record.streamId.toString()}
            dataSource={ streams }
            loading={false}
        />
    );
};
