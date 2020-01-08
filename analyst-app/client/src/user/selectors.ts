import { IState } from 'root/app/state';

export class UserSelectors {
    static user = (state: IState) => UserSelectors.selectSlice(state).user;
    static loading = (state: IState) => UserSelectors.selectSlice(state).userLoading;
    static registrationModalOpened = (state: IState) => UserSelectors.selectSlice(state).registrationModalOpened;
    static registrationLoading = (state: IState) => UserSelectors.selectSlice(state).registrationLoading;
    static registrationLoadError = (state: IState) => UserSelectors.selectSlice(state).registrationLoadError;

    private static selectSlice = (state: IState) => state.user;
}
