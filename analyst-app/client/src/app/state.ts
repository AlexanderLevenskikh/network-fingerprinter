import { RouterState } from 'root/router/state';
import { LocationState } from 'redux-first-router';
import { StreamState } from 'root/streams/state';
import { TcpStatisticsState } from 'root/statistics/state';
import { UserState } from 'root/user/state';

export interface IState {
    stream: StreamState;
    statistics: TcpStatisticsState;
    router: RouterState;
    location: LocationState<string, any>;
    user: UserState;
}
