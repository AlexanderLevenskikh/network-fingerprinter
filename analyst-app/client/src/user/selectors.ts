import { IState } from 'root/app/state';

export class UserSelectors {
    static user = (state: IState) => UserSelectors.selectSlice(state).user;
    static loading = (state: IState) => UserSelectors.selectSlice(state).userLoading;

    private static selectSlice = (state: IState) => state.user;
}
