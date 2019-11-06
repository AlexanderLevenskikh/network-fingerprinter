export const webpackBabelLoader = (configFile: string) => ({
    loader: 'babel-loader',
    options: {
        configFile,
    },
});
