import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as path from 'path';

const allowedExt = new Set([
    '.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg',
]);

const staticRoot = path.resolve('./static');

@Injectable()
export class ReactMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        // Nest 10's middleware path matching no longer guarantees baseUrl
        // carries the route. originalUrl is the actual incoming request path.
        const requestPath = (req.originalUrl || req.path || '').split('?')[0];
        if (requestPath === '/api' || requestPath.startsWith('/api/')) {
            next();
            return;
        }

        const relativePath = requestPath.replace(/^\/+/, '');
        if (allowedExt.has(path.extname(relativePath).toLowerCase())) {
            // Serve only files below the built frontend root.
            const asset = path.resolve(staticRoot, relativePath);
            if (!asset.startsWith(staticRoot + path.sep)) {
                res.status(404).end();
                return;
            }
            res.sendFile(asset);
            return;
        }

        if (requestPath === '/login') {
            res.sendFile(path.join(staticRoot, 'login.html'));
            return;
        }

        res.sendFile(path.join(staticRoot, req.isAuthenticated() ? 'index.html' : 'login.html'));
    }
}
