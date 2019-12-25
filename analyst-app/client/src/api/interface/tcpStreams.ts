import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';

export interface ITcpStreamsApi {
    getList(): Promise<ITcpStreamView[]>;
}
