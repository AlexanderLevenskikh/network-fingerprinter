import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';

export class StreamListState {
    streams: ITcpStreamView[] = [];
    streamsLoading: boolean = false;
}
