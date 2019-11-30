import HTMLWebpackPlugin from 'html-webpack-plugin';
import { Plugin } from 'webpack';

export interface IWebpackHTMLPluginArgs {
    title: string;
    templatePath: string;
}

export const webpackHTMLPlugin = ({ templatePath, title }: IWebpackHTMLPluginArgs): Plugin => {
    return new HTMLWebpackPlugin({
        title,
        template: templatePath,
        inject: true,
    });
};
