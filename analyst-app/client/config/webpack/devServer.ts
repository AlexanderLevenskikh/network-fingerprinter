import { Configuration } from 'webpack-dev-server';
import * as path from 'path';

export const webpackDevServerPart = (historyApiFallback: boolean): Configuration => {
    return {
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'static'),
        public: 'localhost:8080',
        publicPath: '/static/',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        quiet: false,
        noInfo: false,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            children: false,
            chunks: false,
            chunkModules: false,
        },
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/static/index.html' },
            ],
        },
        hot: true,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    };
};
