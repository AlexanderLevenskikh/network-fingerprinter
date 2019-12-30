import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

const resolvePath = (file: string) => path.resolve(`./static/${file}`);

@Injectable()
export class ReactMiddleware implements NestMiddleware {
    use(req, res, next) {
        const { baseUrl } = req;
        if (baseUrl.indexOf('api') === 1) {
            next();
        } else if (allowedExt.filter(ext => baseUrl.indexOf(ext) > 0).length > 0) {
            res.sendFile(resolvePath(baseUrl));
        } else if (baseUrl === '/login') {
            res.sendFile(resolvePath('login.html'));
        } else {
            if (!req.isAuthenticated()) {
                res.sendFile(resolvePath('login.html'));
            } else {
                res.sendFile(resolvePath('index.html'));
            }
        }
    }
}
