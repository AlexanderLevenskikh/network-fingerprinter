export const webpackPostCSSLoader = (pathToConfigDir: string) => ({
    loader: 'postcss-loader',
    options: {
        postcssOptions: { config: pathToConfigDir },
    },
});