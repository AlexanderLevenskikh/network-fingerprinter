import { Configuration } from 'webpack';
import path from 'path';
import config from './config'
import { webpackMiniCssPlugin } from './config/webpack/plugins/miniCss';
import { webpackHTMLPlugin } from './config/webpack/plugins/html';
import { webpackForkTsCheckerPlugin } from './config/webpack/plugins/forkTsChecker';
import { webpackDefinePlugin } from './config/webpack/plugins/define';
import { webpackDevServerHMRPlugin } from './config/webpack/plugins/devServerHMR';
import { webpackOutputPart } from "./config/webpack/output";
import { webpackOptimizationPart } from "./config/webpack/optimization";
import { webpackTypescriptRule } from "./config/webpack/rules/typescript";
import { webpackCssRule } from "./config/webpack/rules/css";
import { webpackFileRule } from "./config/webpack/rules/file";
import { webpackDevServerPart } from "./config/webpack/devServer";

export enum WebpackModeEnum {
    Production = 'production',
    Development = 'development',
}

export interface IWebpackEnv {
    mode: WebpackModeEnum,
    wds: boolean,
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = ({ mode, wds }: IWebpackEnv): Configuration => {
    const isProductionMode = mode === WebpackModeEnum.Production;
    const isProductionApi = Boolean(config.isProdApi);
    const publicPath = '/';

    const entryPoint = path.resolve(
        __dirname,
        'src',
        'app',
        'entry',
        isProductionApi ? 'prod.tsx' : 'fake.tsx',
    );
    const entry = {
        bundle: [
            entryPoint,
        ],
    };

    const output = webpackOutputPart({
        publicPath,
        filename: isProductionMode ? '[name].[hash].js' : '[name].js',
        path: path.resolve(__dirname, 'dist'),
    });

    const devtool = isProductionMode ? false : 'inline-source-map';

    const optimization = webpackOptimizationPart(isProductionMode);

    const title = 'Телеграм';

    const configFile = path.resolve(__dirname, 'babel.config.js');

    const rules = [
        webpackTypescriptRule({
            include: /src/,
            configFile,
        }),
        webpackCssRule({
            isProduction: isProductionMode,
            include: /src/,
            postCSSConfigDirPath: __dirname,
        }),
        webpackFileRule({
            include: /src/,
        }),
    ];

    const plugins = [
        webpackDefinePlugin({
            isProductionApi,
            isProductionMode,
        }),
        webpackMiniCssPlugin('[name].[contenthash].css'),
        webpackHTMLPlugin({
            title,
            templatePath: path.resolve(__dirname, 'templates/index.html'),
        }),
        webpackForkTsCheckerPlugin(path.resolve(__dirname, 'tsconfig.json')),
        ...(wds ? [ webpackDevServerHMRPlugin() ] : []),
    ];

    const resolve = {
        extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ],
        alias: {
            ...(wds ? { 'react-dom': '@hot-loader/react-dom' } : {}),
            'root': path.resolve(__dirname, './src'),
        },
    };

    const devServer = webpackDevServerPart(isProductionApi);

    return {
        mode,
        entry,
        output,
        devtool,
        optimization,
        module: { rules },
        plugins,
        resolve,
        ...(wds ? { devServer } : {}),
    };
};

export default webpackConfig;
