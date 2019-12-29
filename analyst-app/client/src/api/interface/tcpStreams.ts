import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';
import { ITcpStreamFilter } from 'DAL/Stream/Tcp/ITcpStreamFilter';

export interface ITcpStreamsApi {
    getTcpStreamList(
        searchParams: ITcpStreamFilter,
    ): Promise<ITcpStreamView[]>;

    getTcpStreamListTotal(
        searchParams: ITcpStreamFilter,
    ): Promise<number>;
}
