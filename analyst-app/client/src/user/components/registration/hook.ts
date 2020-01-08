import { useSelector } from 'react-redux';
import { UserSelectors } from 'root/user/selectors';

export function useUserRegistration() {
    const loading = useSelector(UserSelectors.registrationLoading);
    const loadError = useSelector(UserSelectors.registrationLoadError);
    const registrationModalOpened = useSelector(UserSelectors.registrationModalOpened);

    return {
        registrationModalOpened,
        loading,
        loadError,
    };
}
