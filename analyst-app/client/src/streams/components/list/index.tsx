import React, { FC, useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchWrapper, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';

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
    const [ streams, setStreams ] = useState(undefined);
    useEffect(() => {
        fetchWrapper({
            controller: '/api/packet',
            action: '/list/tcp/streams',
            method: HttpClientMethod.GET,
            request: {},
            responseType: HttpClientResponseType.JSON,
        }).then(setStreams);
    }, []);

    return (
        <Table<any>
            columns={ columns }
            rowKey={record => record.id}
            dataSource={ streams }
            loading={false}
        />
    );
};
