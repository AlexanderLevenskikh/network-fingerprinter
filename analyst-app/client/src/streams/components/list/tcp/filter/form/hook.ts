import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'root/i18n/resources/namespaces';

export function useTcpStreamsFilterForm() {
    const { t } = useTranslation(I18nNamespace.streams);

    return {
        t,
    }
}
