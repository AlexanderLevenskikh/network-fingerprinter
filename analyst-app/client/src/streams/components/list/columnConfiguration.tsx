import { ColumnProps } from 'antd/lib/table';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { TFunction } from 'i18next';
import { I18StreamsNsKeys } from 'root/i18n/resources/streams/keys';
import React from 'react';
import { renderStreamDateTime } from 'root/streams/components/list/columns/renderDateTime';
import { renderStreamSide } from 'root/streams/components/list/columns/side/renderSide';
import { renderFingerprint } from 'root/streams/components/list/columns/fingerprint/renderFingerprint';
import { renderInfo } from 'root/streams/components/list/columns/info/renderInfo';

export function createColumnsConfiguration(t: TFunction): ColumnProps<ITcpStreamView>[] {
    return [
        {
            title: '',
            width: '14%',
            render: text => renderInfo(text, t),
        },
        {
            title: t(I18StreamsNsKeys.listDateTimeColumnTitle),
            children: [
                {
                    title: t(I18StreamsNsKeys.listStartDateTimeColumnTitle),
                    dataIndex: 'startDateTime',
                    sorter: true,
                    render: startDateTime => renderStreamDateTime(startDateTime),
                    width: '9%',
                },
                {
                    title: t(I18StreamsNsKeys.listEndDateTimeColumnTitle),
                    dataIndex: 'endDateTime',
                    sorter: true,
                    render: endDateTime => renderStreamDateTime(endDateTime),
                    width: '9%',
                },
            ]
        },
        {
            title: t(I18StreamsNsKeys.listAddressColumnTitle),
            children: [
                {
                    title: t(I18StreamsNsKeys.listSourceColumnTitle),
                    render: (_, record) => renderStreamSide({
                        ip: record.sourceIp,
                        port: record.sourcePort,
                        mac: record.sourceMac,
                        t,
                    }),
                    width: '15%',
                },
                {
                    title: t(I18StreamsNsKeys.listDestinationColumnTitle),
                    render: (_, record) => renderStreamSide({
                        ip: record.destinationIp,
                        port: record.destinationPort,
                        mac: record.destinationMac,
                        t,
                    }),
                    width: '15%',
                },
            ],
        },
        {
            title: t(I18StreamsNsKeys.listFingerprintColumnTitle),
            children: [
                {
                    title: t(I18StreamsNsKeys.listSourceColumnTitle),
                    dataIndex: 'sourceFingerprints',
                    render: (text) => renderFingerprint({ fingerprints: text, t }),
                    width: '19%',
                },
                {
                    title: t(I18StreamsNsKeys.listDestinationColumnTitle),
                    dataIndex: 'destinationFingerprints',
                    render: (text) => renderFingerprint({ fingerprints: text, t }),
                    width: '19%',
                },
            ],
        },
    ];
}
