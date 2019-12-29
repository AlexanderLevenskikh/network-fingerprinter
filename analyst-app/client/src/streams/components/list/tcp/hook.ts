import { useDispatch, useSelector } from 'react-redux';
import { StreamListSelectors } from 'root/streams/selectors/list';
import { useEffect } from 'react';
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
import { StreamDatesOrder } from 'root/streams/model/list/streamDatesOrder';
import { put, select } from '@redux-saga/core/effects';
import { StreamsSearchActions } from 'root/streams/actions/search';

export function useStreamsList() {
    const streams = useSelector(StreamListSelectors.list);
    const total = useSelector(StreamListSelectors.total);
    const loading = useSelector(StreamListSelectors.loading);
    const transport = useSelector(StreamRouterSelectors.transport);
    const isTcp = transport === StreamsRouterTransport.Tcp;

    const searchParamsAreEmpty = useSelector(
        isTcp
            ? StreamRouterSelectors.tcpStreamsSearchParamsAreEmpty
            : StreamRouterSelectors.udpStreamsSearchParamsAreEmpty,
    );
    const searchParamsModel = useSelector(
        isTcp
            ? StreamRouterSelectors.tcpStreamsSearchParams
            : StreamRouterSelectors.udpStreamsSearchParams,
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(StreamsListActions.FetchList());

        if (!searchParamsAreEmpty) {
            dispatch(StreamsSearchActions.open());
        }
    }, [ dispatch ]);

    const { t } = useTranslation(I18nNamespace.streams);
    const columns = createColumnsConfiguration(
        searchParamsModel.dateTimeFromOrder,
        searchParamsModel.dateTimeToOrder,
        t,
    );

    const mapAntdSorter = (sorter: SorterResult<ITcpStreamView>, field: keyof ITcpStreamView) => {
        if (sorter.field === field) {
            switch (sorter.order) {
                case 'ascend':
                    return StreamDatesOrder.Asc;
                case 'descend':
                    return StreamDatesOrder.Desc;
                default:
                    return undefined;
            }
        }

        return undefined;
    };

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
                    dateTimeFromOrder: mapAntdSorter(sorter, 'startDateTime'),
                    dateTimeToOrder: mapAntdSorter(sorter, 'endDateTime'),
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
