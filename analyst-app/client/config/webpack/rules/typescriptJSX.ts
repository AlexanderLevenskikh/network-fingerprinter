import { RuleSetRule } from 'webpack';
import { webpackBabelLoader } from './loaders/babel';
import { webpackReactHotLoader } from './loaders/reactHotLoader';
import { IWebpackRuleCreatorArgs } from './index';

export interface IWebpackTypescriptJSXRuleCreatorArgs extends IWebpackRuleCreatorArgs {
    configFile: string;
    wds: boolean;
}

export const webpackTSXRule = ({ wds = false, include, configFile }: IWebpackTypescriptJSXRuleCreatorArgs): RuleSetRule => ({
    test: /\.[jt]sx$/,
    use: [
        ...(wds ? [ webpackReactHotLoader() ] : []),
        webpackBabelLoader(configFile),
    ],
    include,
});
