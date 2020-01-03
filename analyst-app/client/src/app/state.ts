import { RouterState } from 'root/router/state';
import { LocationState } from 'redux-first-router';
import { StreamState } from 'root/streams/state';
import { StatisticsState } from 'root/statistics/state';

export interface IState {
    stream: StreamState;
    statistics: StatisticsState;
    router: RouterState;
    location: LocationState<string, any>;
}
