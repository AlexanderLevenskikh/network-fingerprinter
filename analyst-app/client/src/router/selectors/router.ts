import { IState } from 'root/app/state';

export class RouterSelectors {
    static page = (state: IState) => RouterSelectors.selectSlice(state).page;
    static prevPage = (state: IState) => RouterSelectors.selectSlice(state).prevPage;

    private static selectSlice = (state: IState) => state.router;
}
