import { RouterState } from 'root/router/state';
import { LocationState } from 'redux-first-router';
import { StreamState } from 'root/streams/state';
import { AnyAction } from 'redux';
import { RouterPages } from 'root/router/constants/pages';

export interface IState {
    stream: StreamState;
    router: RouterState;
    location: LocationState<string, any>;
}
