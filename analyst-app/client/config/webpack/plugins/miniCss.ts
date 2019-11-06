import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Plugin } from 'webpack';

export const webpackMiniCssPlugin = (filename: string): Plugin => {
    return new MiniCssExtractPlugin({
        filename,
    });
};
