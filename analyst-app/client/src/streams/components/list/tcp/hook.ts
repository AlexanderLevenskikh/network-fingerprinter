import { useDispatch, useSelector } from 'react-redux';
import { StreamListSelectors } from 'root/streams/selectors/list';
import { useEffect, useState } from 'react';
import { StreamsListActions } from 'root/streams/actions/list';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import { createColumnsConfiguration } from 'root/streams/components/list/tcp/columnConfiguration';
import { PaginationConfig } from 'antd/lib/pagination';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { SorterResult } from 'antd/lib/table';
import { StreamsRouterActions } from 'root/streams/actions/router';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';

export function useStreamsList() {
    const streams = useSelector(StreamListSelectors.list);
    const total = useSelector(StreamListSelectors.total);
    const loading = useSelector(StreamListSelectors.loading);
    const transport = useSelector(StreamRouterSelectors.transport);
    const isTcp = transport === StreamsRouterTransport.Tcp;
    const searchParamsModel = useSelector(
        isTcp
            ? StreamRouterSelectors.tcpStreamsSearchParams
            : StreamRouterSelectors.udpStreamsSearchParams,
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(StreamsListActions.FetchList());
    }, [ dispatch ]);
    const { t } = useTranslation(I18nNamespace.streams);
    const columns = createColumnsConfiguration(t);

    const handleTableChange = (
        pagination: PaginationConfig,
        filters: Record<keyof ITcpStreamView, string[]>,
        sorter: SorterResult<ITcpStreamView>,
    ) => {
        dispatch(StreamsRouterActions.streamsList(
            { transport },
            {
                query: {
                    ...searchParamsModel,
                    current: pagination.current || searchParamsModel.current,
                    take: pagination.pageSize || searchParamsModel.take,
                },
            },
            ));
    };

    return {
        streams,
        columns,
        loading,
        total,
        searchParamsModel,
        handleTableChange,
    }
}
