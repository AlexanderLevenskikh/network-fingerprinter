import { IState } from 'root/app/state';

export class UserSelectors {
    static user = (state: IState) => UserSelectors.selectSlice(state).user;
    static loading = (state: IState) => UserSelectors.selectSlice(state).userLoading;
    static registrationModalOpened = (state: IState) => UserSelectors.selectSlice(state).registrationModalOpened;
    static registrationLoading = (state: IState) => UserSelectors.selectSlice(state).registrationLoading;
    static registrationLoadError = (state: IState) => UserSelectors.selectSlice(state).registrationLoadError;

    static usersListModalOpened = (state: IState) => UserSelectors.selectSlice(state).usesListModalOpened;
    static usersListLoading = (state: IState) => UserSelectors.selectSlice(state).usersListLoading;
    static usersList = (state: IState) => UserSelectors.selectSlice(state).usersList;

    private static selectSlice = (state: IState) => state.user;
}
