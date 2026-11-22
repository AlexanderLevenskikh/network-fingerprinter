import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { WebpackPluginInstance } from 'webpack';

export const webpackForkTsCheckerPlugin = (tsconfigPath: string): WebpackPluginInstance => {
    return new ForkTsCheckerWebpackPlugin({
        typescript: {
            configFile: tsconfigPath,
            diagnosticOptions: { semantic: true, syntactic: true },
        },
    });
};