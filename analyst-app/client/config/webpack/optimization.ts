import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';

export const webpackOptimizationPart = (isProduction: boolean): NonNullable<Configuration['optimization']> => {
    if (!isProduction) {
        return { moduleIds: 'named' };
    }

    return {
        minimizer: [
            new TerserPlugin({
                parallel: 2,
                terserOptions: { format: { comments: false } },
            }),
            new CssMinimizerPlugin(),
        ],
    };
};