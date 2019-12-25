import { RuleSetRule } from 'webpack';
import { IWebpackCSSRuleCreatorArgs } from './css';
import { webpackCssLoader } from './loaders/css';
import { webpackLessLoader } from './loaders/less';
import { webpackPostCSSLoader } from './loaders/postcss';
import { webpackStyleLoader } from './loaders/style';

export const webpackLessRule = (
    {
        exclude,
        include,
        isProduction = false,
        enableMiniCSS = false,
        postCSSConfigDirPath,
    }: IWebpackCSSRuleCreatorArgs,
): RuleSetRule => ({
    test: /\.less$/,
    use: [
        webpackStyleLoader(enableMiniCSS || isProduction),
        webpackCssLoader(isProduction, 2),
        webpackPostCSSLoader(postCSSConfigDirPath),
        webpackLessLoader(),
    ],
    include,
    exclude,
});
