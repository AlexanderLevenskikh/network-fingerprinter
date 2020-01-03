import { ITcpStreamFilter } from 'DAL/Stream/Tcp/ITcpStreamFilter';
import { ITcpStreamsView } from 'DAL/Stream/Tcp/ITcpStreamsView';

export interface ITcpStreamsApi {
    getTcpStreamList(
        searchParams: ITcpStreamFilter,
    ): Promise<ITcpStreamsView>;
}
