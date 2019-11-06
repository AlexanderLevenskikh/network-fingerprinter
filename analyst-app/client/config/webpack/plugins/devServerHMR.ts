import { HotModuleReplacementPlugin, Plugin } from 'webpack';

export const webpackDevServerHMRPlugin = (): Plugin => {
    return new HotModuleReplacementPlugin();
};
