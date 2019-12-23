import React, { FC, useEffect, useState } from 'react';
import { Table } from 'antd';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { useDispatch, useSelector } from 'react-redux';
import { StreamsListActions } from 'root/streams/actions/list';
import { StreamListSelectors } from 'root/streams/selectors/list';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import { createColumnsConfiguration } from 'root/streams/components/list/columnConfiguration';

interface IProps {
}

export const StreamsList: FC<IProps> = () => {
    const streams = useSelector(StreamListSelectors.list);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(StreamsListActions.FetchList());
    }, [ dispatch ]);
    const { t } = useTranslation(I18nNamespace.streams);
    const columns = createColumnsConfiguration(t);

    return (
        <Table<ITcpStreamView>
            columns={ columns }
            rowKey={record => record.streamId.toString()}
            dataSource={ streams }
            loading={false}
        />
    );
};
