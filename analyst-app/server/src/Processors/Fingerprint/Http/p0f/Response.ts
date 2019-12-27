import { IMap } from '../../../../Shared/Types/IMap';

export const httpResponseP0fSignatures: IMap<string[]> = {
    // Apache
    's:!:Apache:2.x': [
        '1:Date,Server,?Last-Modified,?Accept-Ranges=[bytes],?Content-Length,?Content-Range,Keep-Alive=[timeout],Connection=[Keep-Alive],?Transfer-Encoding=[chunked],Content-Type::Apache',
        '1:Date,Server,?Last-Modified,?Accept-Ranges=[bytes],?Content-Length,?Connection=[close],?Transfer-Encoding=[chunked],Content-Type:Keep-Alive:Apache',
        '1:Date,Server,Connection=[Keep-Alive],Keep-Alive=[timeout]:Content-Type,Accept-Ranges:Apache',
        '1:Date,Server,?Last-Modified,?Accept-Ranges=[bytes],?Content-Length,Content-Type,Keep-Alive=[timeout],Connection=[Keep-Alive]::Apache',
    ],
    's:!:Apache:1.x': [
        '1:Server,Content-Type,?Content-Length,Date,Connection=[keep-alive]:Keep-Alive,Accept-Ranges:Apache',
        '1:Server,Content-Type,?Content-Length,Date,Connection=[close]:Keep-Alive,Accept-Ranges:Apache',
    ],

    // IIS
    's:!:IIS:7.x': [
        '1:?Content-Length,Content-Type,?Etag,Server,Date:Connection,Keep-Alive,Accept-Ranges:Microsoft-IIS/',
        '1:?Content-Length,Content-Type,?Etag,Server,Date,Connection=[close]:Keep-Alive,Accept-Ranges:Microsoft-IIS/',
    ],

    // lighttpd
    's:!:lighttpd:2.x': [
        '1:?ETag,?Last-Modified,Accept-Ranges=[bytes],Content-Type,?Vary,?Content-Length,Date,Server:Connection,Keep-Alive:lighttpd/',
        '1:?ETag,?Last-Modified,Transfer-Encoding=[chunked],Content-Type,?Vary,?Content-Length,Date,Server:Connection,Keep-Alive:lighttpd/',
    ],
    's:!:lighttpd:1.x': [
        '1:Content-Type,Accept-Ranges=[bytes],?ETag,?Last-Modified,Date,Server:Connection,Keep-Alive:lighttpd/',
        '1:Content-Type,Transfer-Encoding=[chunked],?ETag,?Last-Modified,Date,Server:Connection,Keep-Alive:lighttpd/',
        '0:Content-Type,Content-Length,Connection=[close],Date,Server:Keep-Alive,Accept-Ranges:lighttpd/',
    ],

    // nginx
    's:!:nginx:1.x': [
        '1:Server,Date,Content-Type,?Content-Length,?Last-Modified,Connection=[keep-alive],Keep-Alive=[timeout],Accept-Ranges=[bytes]::nginx/',
        '1:Server,Date,Content-Type,?Content-Length,?Last-Modified,Connection=[close]:Keep-Alive,Accept-Ranges:nginx/',
    ],
    's:!:nginx:0.x': [
        '1:Server,Date,Content-Type,?Content-Length,Connection=[keep-alive],?Last-Modified:Keep-Alive,Accept-Ranges:nginx/',
        '1:Server,Date,Content-Type,?Content-Length,Connection=[close],?Last-Modified:Keep-Alive,Accept-Ranges:nginx/',
    ],

    // Odds and ends
    's:!:Google Web Server:': [
        '*:Content-Type,X-Content-Type-Options=[nosniff],Date,Server=[sffe]:Connection,Accept-Ranges,Keep-Alive,Connection:',
        '*:Date,Content-Type,Server=[gws]:Connection,Accept-Ranges,Keep-Alive:',
        '*:Content-Type,X-Content-Type-Options=[nosniff],Server=[GSE]:Connection,Accept-Ranges,Keep-Alive:',
    ],
};
