import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { TcpStreamsList } from 'root/streams/components/list/tcp';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';

interface IProps {
}

export const StreamsPage: FC<IProps> = () => {
    const renderList = useSelector(StreamRouterSelectors.renderList);
    const transport = useSelector(StreamRouterSelectors.transport);

    const renderTcpStreamsList = renderList && transport === StreamsRouterTransport.Tcp;

    return (
        <>
            { renderTcpStreamsList && (
                <TcpStreamsList />
            )}
        </>
    );
};
