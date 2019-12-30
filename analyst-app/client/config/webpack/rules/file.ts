import { RuleSetRule } from 'webpack';
import { IWebpackRuleCreatorArgs } from './index';

export const webpackFileRule = ({ exclude, include }: IWebpackRuleCreatorArgs = { }): RuleSetRule => ({
    test: /\.(jpg|png|gif|svg|woff|woff2|eot)$/,
    loader: 'file-loader',
    options: {
        publicPath: '',
    },
    include,
    exclude,
});
