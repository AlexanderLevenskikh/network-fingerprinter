import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import * as http from 'http';

/**
 * Elasticsearch 8 REST client boundary preserving the existing RxJS/[body]
 * response used by NestJS 6 read-side mappers. The legacy @nestjs/elasticsearch
 * 6 client targets older Elasticsearch and is not used at runtime.
 *
 * Bounded, read-only API; packet writes use checked, batched Bulk REST calls.
 */
@Injectable()
export class ElasticsearchService {
    public search<T>(request: any): Observable<any> {
        const body = { ...(request.body || {}) };
        if (request.size !== undefined) {
            body.size = request.size;
        }
        return from(this.call(request.index, '_search', body));
    }

    public count(request: any): Observable<any> {
        return from(this.call(request.index, '_count', request.body || {}));
    }

    private call(index: string, action: string, body: any): Promise<any[]> {
        const host = process.env.ELASTIC_HOST;
        const username = process.env.ELASTIC_USERNAME;
        const password = process.env.ELASTIC_PASSWORD;
        if (!host || !username || !password) {
            return Promise.reject(new Error('Elasticsearch connection environment is incomplete'));
        }
        if (!/^[a-zA-Z0-9.-]+:[0-9]{2,5}$/.test(host)) {
            return Promise.reject(new Error('Elasticsearch host must be an internal host:port'));
        }
        const [hostname, portText] = host.split(':');
        const payload = JSON.stringify(body);
        const endpoint = '/' + encodeURIComponent(index) + '/' + action;
        const maxBytes = 32 * 1024 * 1024;

        return new Promise<any[]>((resolve, reject) => {
            const request = http.request({
                hostname,
                port: Number(portText),
                path: endpoint,
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload),
                },
            }, response => {
                const status = response.statusCode || 0;
                let bytes = 0;
                const chunks: Buffer[] = [];
                response.on('data', (chunk: Buffer) => {
                    bytes += chunk.length;
                    if (bytes > maxBytes) {
                        request.destroy(new Error('Elasticsearch response exceeds size limit'));
                        return;
                    }
                    chunks.push(chunk);
                });
                response.on('end', () => {
                    if (status < 200 || status >= 300) {
                        reject(new Error('Elasticsearch HTTP ' + status));
                        return;
                    }
                    try {
                        // Legacy mappers expect response[0].hits/aggregations/count.
                        resolve([JSON.parse(Buffer.concat(chunks).toString('utf8'))]);
                    } catch (_) {
                        reject(new Error('Elasticsearch returned invalid JSON'));
                    }
                });
                response.on('error', () => reject(new Error('Elasticsearch response stream failed')));
            });
            request.setTimeout(20000, () => request.destroy(new Error('Elasticsearch request timed out')));
            request.on('error', () => reject(new Error('Elasticsearch request failed')));
            request.end(payload);
        });
    }
}
