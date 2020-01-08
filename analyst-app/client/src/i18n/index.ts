import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Languages } from 'root/shared/constants/languages';
import { i18nResources } from 'root/i18n/resources';
import { i18NLanguageLocalStorageKey } from 'root/i18n/constants/localStorageKey';

const defaultLang = localStorage.getItem(i18NLanguageLocalStorageKey) || Languages.ru;

i18n
    .use(initReactI18next)
    .init({
        lng: defaultLang,
        fallbackLng: Languages.ru,
        resources: i18nResources,
        debug: true,
        ns: ['main', 'streams', 'statistics', 'player', 'user'],
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
