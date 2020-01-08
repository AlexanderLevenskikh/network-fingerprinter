import { IMap } from 'root/shared/types/iMap';
import { Nullable } from 'root/shared/types/nullable';
import { stringifyNonEmptyParams } from 'root/api/httpClient/stringifyNonEmptyParams';
import { objectToFormData } from 'root/api/httpClient/objectToFormData';
import { notEmpty } from 'root/shared/utils/notEmpty';
import { FilePolyfill } from 'root/shared/utils/filePolyfill';

export enum HttpClientMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
}

const antiForgeryTokenCookieKey = 'CSRF-TOKEN';

export interface IHttpClientRequest {
    query?: IMap<any>;
    body?: IMap<any>;
    toFormData?: boolean;
}

export enum HttpClientResponseType {
    Binary,
    Primitive,
    JSON,
}

export interface IHttpClientOptions {
    controller: string;
    action: string;
    method: HttpClientMethod;
    request: IHttpClientRequest;
    responseType: HttpClientResponseType;
}

export function createHttpClient<T>() {
    return async (options: IHttpClientOptions): Promise<any> => {
        const { request, responseType, method } = options;

        let url = `/${ options.controller }/${ options.action }`;
        if (request.query) {
            url = `${ url }${ stringifyNonEmptyParams(request.query) }`;
        }

        let httpClientOptions: RequestInit = {
            method: options.method.toString(),
            cache: 'no-store',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        };

        if (method === HttpClientMethod.POST && request.body) {
            if (request.toFormData) {
                const body = objectToFormData(request.body);

                httpClientOptions = {
                    ...httpClientOptions,
                    body,
                };
            } else {
                httpClientOptions = {
                    ...httpClientOptions,
                    body: JSON.stringify(request.body),
                    headers: {
                        ...httpClientOptions.headers,
                        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                };
            }
        }

        return fetch(url, httpClientOptions)
            .then(async response => {
                if (response.redirected && !IS_WDS) {
                    window.location.href = response.url || '/';
                }

                if (response.ok) {
                    if (responseType === HttpClientResponseType.Binary) {
                        const blob = await response.blob();
                        const contentDisposition = response.headers.get('content-disposition');
                        if (contentDisposition) {
                            const filenameRegex = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/ig;
                            const firstGroupMatches = filenameRegex.exec(contentDisposition);
                            const secondGroupMatches = filenameRegex.exec(contentDisposition);
                            if (notEmpty(secondGroupMatches)) {
                                let filename;
                                if (secondGroupMatches[ 3 ]) {
                                    filename = decodeURIComponent(secondGroupMatches[ 3 ]);
                                } else if (notEmpty(firstGroupMatches) && firstGroupMatches[ 2 ]) {
                                    filename = firstGroupMatches[ 2 ];
                                } else {
                                    filename = 'file';
                                }

                                let file: Blob;
                                try {
                                    file = new File([ blob ], filename);
                                } catch (err) {
                                    file = new FilePolyfill([ blob ], filename);
                                }
                                return file;
                            }
                        }

                        return blob;
                    } else if (responseType === HttpClientResponseType.Primitive) {
                        return response.text();
                    }
                    return parseJSON(response);
                } else {
                    // Errors handling
                }
            });
    };
}

export const httpClient = createHttpClient();

async function parseJSON(response: Response): Promise<any> {
    const text = await response.text();
    const obj = text ? JSON.parse(text) : { };

    return obj;
}
