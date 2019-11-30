import { RuleSetRule } from 'webpack';
import { webpackBabelLoader } from './loaders/babel';
import { IWebpackRuleCreatorArgs } from "./index";

export interface IWebpackTypescriptRuleCreatorArgs extends IWebpackRuleCreatorArgs {
    configFile: string;
}

export const webpackTypescriptRule = ({ exclude, include, configFile }: IWebpackTypescriptRuleCreatorArgs): RuleSetRule => ({
    test: /\.[jt]s$/,
    use: [
        webpackBabelLoader(configFile),
    ],
    include,
    exclude,
});
