import { useDispatch, useSelector } from 'react-redux';
import { UserSelectors } from 'root/user/selectors';
import { useEffect } from 'react';
import { UserActions } from 'root/user/actions';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';

export function useUsersList() {
    const currentUser = useSelector(UserSelectors.user);
    const list = useSelector(UserSelectors.usersList);
    const loading = useSelector(UserSelectors.usersListLoading);
    const modalOpened = useSelector(UserSelectors.usersListModalOpened);

    const dispatch = useDispatch();
    const close = () => {
        dispatch(UserActions.CloseUsersListModal());
    };

    const remove = (userId: string) => {
        dispatch(UserActions.RemoveUser({ userId }));
    };

    const { t } = useTranslation(I18nNamespace.user);

    return {
        t,
        currentUser,
        list,
        loading,
        modalOpened,
        remove,
        close,
    };
}
