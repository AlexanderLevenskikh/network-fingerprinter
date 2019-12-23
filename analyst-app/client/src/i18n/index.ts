import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Languages } from 'root/shared/constants/languages';
import { i18nResources } from 'root/i18n/resources';

i18n
    .use(initReactI18next)
    .init({
        lng: Languages.ru,
        fallbackLng: Languages.ru,
        resources: i18nResources,
        debug: true,
        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
        ns: ['main', 'streams'],
        defaultNS: 'main',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            wait: true
        }
    });

export default i18n
