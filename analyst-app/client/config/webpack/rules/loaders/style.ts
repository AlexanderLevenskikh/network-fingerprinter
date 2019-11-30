import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const webpackStyleLoader = (isProduction: boolean) => isProduction ? MiniCssExtractPlugin.loader : 'style-loader';
