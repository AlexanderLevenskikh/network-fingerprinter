import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RussianFlag } from 'root/shared/components/LanguageSelector/flags/ru';
import { USAFlag } from 'root/shared/components/LanguageSelector/flags/us';
import { Languages } from 'root/shared/constants/languages';

interface IProps {
}

export const LanguageSelector: FC<IProps> = () => {
    const { t, i18n } = useTranslation();

    const changeLanguageToRu = (event: any) => {
        i18n.changeLanguage(Languages.ru);
    };
    const changeLanguageToUs = (event: any) => {
        i18n.changeLanguage(Languages.us);
    };
    const isRuActive = i18n.languages[0] === Languages.ru;
    const isUsActive = i18n.languages[0] === Languages.us;

    return (
        <span>
            <RussianFlag onClick={ changeLanguageToRu } isActive={ isRuActive }/>
            <USAFlag onClick={ changeLanguageToUs } isActive={ isUsActive }/>
        </span>
    );
};
