import { Configuration } from 'webpack-dev-server';
import * as path from 'path';

export const webpackDevServerPart = (historyApiFallback: boolean): Configuration => ({
    host: '0.0.0.0',
    static: { directory: path.resolve(__dirname, '../../dist') },
    devMiddleware: { publicPath: '/' },
    historyApiFallback: historyApiFallback,
    hot: true,
    proxy: [{ context: ['/api'], target: 'http://localhost:3000' }],
    client: { logging: 'warn' },
});