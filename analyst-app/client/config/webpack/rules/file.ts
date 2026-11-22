import { RuleSetRule } from 'webpack';
import { IWebpackRuleCreatorArgs } from './index';

// Webpack 5 built-in Asset Modules replace legacy file-loader.
export const webpackFileRule = ({ exclude, include }: IWebpackRuleCreatorArgs = { }): RuleSetRule => ({
    test: /\.(jpg|png|gif|svg|woff|woff2|eot)$/,
    type: 'asset/resource',
    generator: { publicPath: '' },
    include,
    exclude,
});