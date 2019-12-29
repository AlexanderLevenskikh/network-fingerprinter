import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';

export class StreamListState {
    streams: ITcpStreamView[] = [];
    streamsTotal: number = 0;
    streamsLoading: boolean = false;
}
