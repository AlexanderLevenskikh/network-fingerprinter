import { DefinePlugin, Plugin } from 'webpack';

export interface IWebpackDefinePluginArgs {
    wds: boolean;
    isProductionMode: boolean;
    isProductionApi: boolean;
}

export const webpackDefinePlugin = ({ wds, isProductionApi, isProductionMode }: IWebpackDefinePluginArgs): Plugin => {
    return new DefinePlugin({
        IS_WDS: wds,
        IS_PRODUCTION_API: isProductionApi,
        IS_PRODUCTION_MODE: isProductionMode,
    });
};
