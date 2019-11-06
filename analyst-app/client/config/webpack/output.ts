import { LibraryTarget, Output } from 'webpack';

export interface IWebpackOutputPartArgs {
    filename: string;
    publicPath?: string;
    library?: string;
    libraryTarget?: LibraryTarget;
    globalObject?: string;
    path?: string;
}

export const webpackOutputPart = ({ publicPath, filename, library, libraryTarget, globalObject, path }: IWebpackOutputPartArgs): Output => {
    return {
        ...( publicPath ? { publicPath } : { }),
        ...( library ? { library } : { }),
        ...( libraryTarget ? { libraryTarget } : { }),
        ...( globalObject ? { globalObject } : { }),
        ...( path ? { path } : { }),
        filename,
    };
};
