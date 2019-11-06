export const webpackCssLoader = (isProduction: boolean, importLoaders: number) => ({
    loader: 'css-loader',
    options: {
        modules: {
            mode: 'global',
            localIdentName: isProduction ? '[hash:base64:5]' : '[local]_[hash:base64:5]',
        },
        importLoaders,
    },
});
