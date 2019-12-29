import { StreamListState } from 'root/streams/state/list';
import { StreamRouterState } from 'root/streams/state/router';

export class StreamState {
    list: StreamListState = new StreamListState();
    router: StreamRouterState = new StreamRouterState();
}
