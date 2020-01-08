import { useDispatch, useSelector } from 'react-redux';
import { UserSelectors } from 'root/user/selectors';
import { IUserRegistrationModel } from 'root/user/model/registration';
import { UserActions } from 'root/user/actions';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';

export function useUserRegistrationForm() {
    const loading = useSelector(UserSelectors.registrationLoading);
    const { t } = useTranslation(I18nNamespace.user);

    const dispatch = useDispatch();
    const register = (model: IUserRegistrationModel) => {
        dispatch(UserActions.RegisterUser({ model }));
    };

    const close = () => {
        dispatch(UserActions.CloseUserRegistrationModal());
    };

    return {
        t,
        loading,
        register,
        close,
    };
}
