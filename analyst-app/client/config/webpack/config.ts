import { Configuration } from 'webpack';
import path from 'path';
import config from '../index';
import { webpackOutputPart } from "./output";
import { webpackOptimizationPart } from "./optimization";
import { webpackTypescriptRule } from "./rules/typescript";
import { webpackCssRule } from "./rules/css";
import { webpackFileRule } from "./rules/file";
import { webpackDefinePlugin } from "./plugins/define";
import { webpackMiniCssPlugin } from "./plugins/miniCss";
import { webpackHTMLPlugin } from "./plugins/html";
import { webpackForkTsCheckerPlugin } from "./plugins/forkTsChecker";
import { webpackDevServerHMRPlugin } from "./plugins/devServerHMR";
import { webpackDevServerPart } from "./devServer";

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
        path: path.resolve('dist'),
    });

    const devtool = isProductionMode ? false : 'inline-source-map';

    const optimization = webpackOptimizationPart(isProductionMode);

    const title = 'Телеграм';

    const configFile = path.resolve('babel.config.js');

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
            templatePath: path.resolve('templates/index.html'),
        }),
        webpackForkTsCheckerPlugin(path.resolve('tsconfig.json')),
        ...(wds ? [ webpackDevServerHMRPlugin() ] : []),
        new BundleAnalyzerPlugin(),
    ];

    const resolve = {
        extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ],
        alias: {
            ...(wds ? { 'react-dom': '@hot-loader/react-dom' } : {}),
            'root': path.resolve('./src'),
        },
    };

    const devServer = webpackDevServerPart(isProductionApi);

    return {
        context: process.cwd(),
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
