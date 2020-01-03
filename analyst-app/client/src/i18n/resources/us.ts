import { i18MainNsUsResources } from 'root/i18n/resources/main/us';
import { I18nNamespace } from 'root/i18n/resources/namespaces';
import { i18StreamsNsUsResources } from 'root/i18n/resources/streams/us';
import { i18PlayerNsUsResources } from 'root/i18n/resources/player/us';
import { i18StatisticsNsRuResources } from 'root/i18n/resources/statistics/ru';
import { i18StatisticsNsUsResources } from 'root/i18n/resources/statistics/us';

export const i18UsResources = {
    [ I18nNamespace.main ]: i18MainNsUsResources,
    [ I18nNamespace.streams ]: i18StreamsNsUsResources,
    [ I18nNamespace.statistics ]: i18StatisticsNsUsResources,
    [ I18nNamespace.player ]: i18PlayerNsUsResources,
};
