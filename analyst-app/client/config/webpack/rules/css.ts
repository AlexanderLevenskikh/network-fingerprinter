import { RuleSetRule } from 'webpack';
import { webpackCssLoader } from './loaders/css';
import { webpackPostCSSLoader } from './loaders/postcss';
import { webpackStyleLoader } from './loaders/style';
import { IWebpackRuleCreatorArgs } from "./index";

export interface IWebpackCSSRuleCreatorArgs extends IWebpackRuleCreatorArgs {
    isProduction: boolean;
    enableMiniCSS?: boolean;
    postCSSConfigDirPath: string;
}

export const webpackCssRule = (
    {
        exclude,
        include,
        isProduction = false,
        enableMiniCSS = false,
        postCSSConfigDirPath,
    }: IWebpackCSSRuleCreatorArgs,
): RuleSetRule => ({
    test: /\.css$/,
    use: [
        webpackStyleLoader(enableMiniCSS || isProduction),
        webpackCssLoader(isProduction, 1),
        webpackPostCSSLoader(postCSSConfigDirPath),
    ],
    include,
    exclude,
});
