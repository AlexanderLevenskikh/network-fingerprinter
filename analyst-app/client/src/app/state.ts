import { RouterState } from 'root/router/state';
import { LocationState } from 'redux-first-router';

export interface IState {
    router: RouterState;
    location: LocationState<{}, any>;
}
