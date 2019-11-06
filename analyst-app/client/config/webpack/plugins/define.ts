import { DefinePlugin, Plugin } from 'webpack';

export interface IWebpackDefinePluginArgs {
    isProductionMode: boolean;
    isProductionApi: boolean;
}

export const webpackDefinePlugin = ({ isProductionApi, isProductionMode }: IWebpackDefinePluginArgs): Plugin => {
    return new DefinePlugin({
        IS_PRODUCTION_API: isProductionApi,
        IS_PRODUCTION_MODE: isProductionMode,
    });
};
