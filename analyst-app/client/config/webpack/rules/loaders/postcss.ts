export const webpackPostCSSLoader = (pathToConfigDir: string) => ({
    loader: 'postcss-loader',
    options: {
        config: {
            path: pathToConfigDir,
        },
    },
});
