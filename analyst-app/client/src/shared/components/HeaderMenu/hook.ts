import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { StreamsRouterActions } from 'root/streams/actions/router';
import { StreamsRouterTransport } from 'root/streams/constants/router/transport';
import { useTranslation } from 'react-i18next';
import { RouterSelectors } from 'root/router/selectors/router';
import { StreamRouterSelectors } from 'root/streams/selectors/router';

export function useHeaderMenu() {
    const page = useSelector(RouterSelectors.page);
    const transport = useSelector(StreamRouterSelectors.transport);
    const dispatch = useDispatch();
    const onClickTcpStreams = useCallback(
        () => dispatch(StreamsRouterActions.streamsList({ transport: StreamsRouterTransport.Tcp })),
        [ dispatch ],
    );
    const onClickUdpStreams = useCallback(
        () => dispatch(StreamsRouterActions.streamsList({ transport: StreamsRouterTransport.Udp })),
        [ dispatch ],
    );
    const { t } = useTranslation();

    return {
        page,
        transport,
        onClickTcpStreams,
        onClickUdpStreams,
        t,
    }
}
