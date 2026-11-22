import { Configuration } from 'webpack';
type Output = NonNullable<Configuration['output']>;

export interface IWebpackOutputPartArgs {
    filename: string;
    publicPath?: string;
    library?: Output['library'];
    libraryTarget?: Output['libraryTarget'];
    globalObject?: string;
    path?: string;
}

export const webpackOutputPart = ({ publicPath, filename, library, libraryTarget, globalObject, path }: IWebpackOutputPartArgs): Output => ({
    ...(publicPath ? { publicPath } : {}),
    ...(library ? { library } : {}),
    ...(libraryTarget ? { libraryTarget } : {}),
    ...(globalObject ? { globalObject } : {}),
    ...(path ? { path } : {}),
    filename,
});