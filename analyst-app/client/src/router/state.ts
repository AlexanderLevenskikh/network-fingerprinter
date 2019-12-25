import { RouterPages } from 'root/router/constants/pages';
import { Nullable } from 'root/shared/types/nullable';

export class RouterState {
    prevPage: Nullable<RouterPages> = null;
    page: Nullable<RouterPages> = null;
}
