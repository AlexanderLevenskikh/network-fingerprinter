import { useDispatch, useSelector } from 'react-redux';
import { StreamListSelectors } from 'root/streams/selectors/list';
import { useEffect } from 'react';
import { StreamsListActions } from 'root/streams/actions/list';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import { createTcpStreamsListColumnsConfiguration } from 'root/streams/components/list/tcp/columnConfiguration';
import { TablePaginationConfig, SorterResult, FilterValue } from 'antd/es/table/interface';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { StreamsRouterActions } from 'root/streams/actions/router';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { StreamDatesOrder } from 'root/streams/model/list/streamDatesOrder';
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
        if (dispatch) {
            dispatch(StreamsListActions.FetchList());

            if (!searchParamsAreEmpty) {
                dispatch(StreamsSearchActions.open());
            }
        }
    }, [ dispatch ]);

    const { t } = useTranslation(I18nNamespace.streams);
    const columns = createTcpStreamsListColumnsConfiguration(
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
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<ITcpStreamView> | SorterResult<ITcpStreamView>[],
    ) => {
        const activeSorter = Array.isArray(sorter) ? sorter[0] : sorter;
        const paging = pagination as TablePaginationConfig & { current?: number; pageSize?: number };
        dispatch(StreamsRouterActions.streamsList(
            { transport },
            {
                query: {
                    ...searchParamsModel,
                    current: paging.current || searchParamsModel.current,
                    take: paging.pageSize || searchParamsModel.take,
                    dateTimeFromOrder: mapAntdSorter(activeSorter,  'startDateTime'),
                    dateTimeToOrder: mapAntdSorter(activeSorter,  'endDateTime'),
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