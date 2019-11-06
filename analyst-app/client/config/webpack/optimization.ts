import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { Options } from 'webpack';

export const webpackOptimizationPart = (isProduction: boolean): Options.Optimization => {
    if (!isProduction) {
        return {
            namedModules: true,
        };
    }

    return {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({ }),
        ],
    };
};
