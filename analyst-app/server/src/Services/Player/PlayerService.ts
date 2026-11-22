import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '../../DAL/Elastic/ElasticsearchService';
import { execFile } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as readline from 'readline';

const run = promisify(execFile);
export const MAX_PCAP_BYTES = 10 * 1024 * 1024;
const FILTER = 'tcp.flags.syn == 1 or tls.handshake.type == 1 or http.request == 1 or http.response == 1';

export interface PcapImportResult {
    status: 'indexed' | 'no_matches';
    indexedPackets: number;
}

@Injectable()
export class PlayerService {
    constructor(private readonly elasticsearchService: ElasticsearchService) {}

    public async uploadDump(fileBuffer: Buffer): Promise<PcapImportResult> {
        if (!fileBuffer || !fileBuffer.length) {
            throw new BadRequestException('A non-empty PCAP file is required');
        }
        if (fileBuffer.length > MAX_PCAP_BYTES) {
            throw new HttpException('PCAP exceeds the 10 MiB limit', HttpStatus.PAYLOAD_TOO_LARGE);
        }

        // Each request owns its own directory; no shared relative paths or shell commands.
        const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'nf-player-'));
        const original = path.join(dir, 'original.pcap');
        const decoded = path.join(dir, 'decoded.ndjson');
        const batch = path.join(dir, 'batch.ndjson');
        const importId = uuid.v4();
        let indexedPackets = 0;
        try {
            await fs.promises.writeFile(original, fileBuffer);
            // Validate the input even if the display filter matches nothing.
            // One tshark decode of the ORIGINAL capture preserves global tcp.stream
            // numbers, including connections whose first packets are filtered out.
            try {
                await this.packetCount(original);
            } catch (_) {
                throw new BadRequestException('Invalid or damaged PCAP file');
            }
            await this.command('tshark', ['-T', 'ek', '-Y', FILTER, '-r', original, '-n'], decoded);
            const input = fs.createReadStream(decoded, { encoding: 'utf8' });
            const lines = readline.createInterface({ input, crlfDelay: Infinity });
            let action: any = null;
            let documents = 0;
            let pending = '';
            let pendingCount = 0;
            try {
                for await (const line of lines) {
                    if (!line.trim()) { continue; }
                    const row = JSON.parse(line);
                    if (action === null) {
                        if (!row.index) { throw new Error('Expected tshark bulk index action'); }
                        delete row.index._type;
                        action = row;
                    } else {
                        if (!row.layers || row.index) { throw new Error('Invalid tshark bulk document'); }
                        const stream = row.layers.tcp && row.layers.tcp.tcp_tcp_stream !== undefined
                            ? row.layers.tcp.tcp_tcp_stream
                            : row.layers.udp && row.layers.udp.udp_udp_stream !== undefined
                                ? row.layers.udp.udp_udp_stream : uuid.v4();
                        // Wireshark 4 EK renamed tcp.flags.* to tcp_tcp_flags_* and
                        // emits booleans. Legacy Analyst queries require tcp_flags_tcp_flags_* string '1'/'0'
                        // in _source (Elasticsearch can coerce these to integer mapping).
                        if (row.layers.tcp) {
                            const tcp = row.layers.tcp;
                            for (const flag of [
                                'urg', 'ack', 'push', 'reset', 'syn', 'fin',
                            ]) {
                                const modern = 'tcp_tcp_flags_' + flag;
                                const legacy = 'tcp_flags_tcp_flags_' + flag;
                                if (Object.prototype.hasOwnProperty.call(tcp, modern)) {
                                    const value = tcp[modern];
                                    tcp[legacy] = value === true || value === 1 || value === '1' ? '1' : '0';
                                    delete tcp[modern];
                                }
                            }
                            if (tcp.tcp_tcp_flags_str !== undefined) {
                                tcp.tcp_flags_tcp_flags_str = tcp.tcp_tcp_flags_str;
                                delete tcp.tcp_tcp_flags_str;
                            }
                        }
                        row.streamId = importId + '-' + stream;
                        row.sensorId = 'pcap-player-' + process.env.APP_ID;
                        pending += JSON.stringify(action) + '\n' + JSON.stringify(row) + '\n';
                        action = null;
                        documents++;
                        pendingCount++;
                        if (pendingCount === 100) {
                            await fs.promises.writeFile(batch, pending);
                            indexedPackets += await this.sendChunkToElastic(batch, pendingCount);
                            pending = '';
                            pendingCount = 0;
                        }
                    }
                }
                if (action !== null) { throw new Error('Incomplete tshark action/document pair'); }
                if (pendingCount) {
                    await fs.promises.writeFile(batch, pending);
                    indexedPackets += await this.sendChunkToElastic(batch, pendingCount);
                }
            } finally {
                lines.close();
                input.destroy();
            }
            if (indexedPackets !== documents) {
                throw new Error('Indexed packet count mismatch');
            }
            return { status: documents === 0 ? 'no_matches' : 'indexed', indexedPackets };
        } catch (error) {
            if (indexedPackets > 0) {
                // An earlier successful bulk request is not an atomic transaction.
                // Never report success after a later failed chunk.
                throw new HttpException(
                    { message: 'Import failed after partially indexing packets', indexedPackets },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
            throw error;
        } finally {
            // Only flat, private temporary files are created in this directory.
            // Delete contents before rmdir; this works with the pinned TS/Node types.
            for (const name of await fs.promises.readdir(dir)) {
                await fs.promises.unlink(path.join(dir, name));
            }
            await fs.promises.rmdir(dir);
        }
    }

    private async command(executable: string, args: string[], outputFile?: string): Promise<string> {
        // No shell interpolation. Tightly bound child lifetime and stdout buffer.
        if (outputFile) {
            // tshark EK output can exceed execFile maxBuffer, so stream stdout to disk.
            await new Promise<void>((resolve, reject) => {
                const child = require('child_process').spawn(executable, args, { stdio: ['ignore', 'pipe', 'pipe'] });
                const output = fs.createWriteStream(outputFile);
                let stderr = '';
                let bytes = 0;
                child.stdout.on('data', chunk => {
                    bytes += chunk.length;
                    if (bytes > 256 * 1024 * 1024) { child.kill('SIGKILL'); }
                });
                let settled = false;
                const timer = setTimeout(() => child.kill('SIGKILL'), 60000);
                child.stdout.pipe(output);
                child.stderr.on('data', chunk => { stderr = (stderr + chunk.toString()).slice(-2048); });
                const fail = (error: Error) => {
                    if (!settled) { settled = true; clearTimeout(timer); reject(error); }
                };
                child.on('error', fail);
                output.on('error', error => { child.kill('SIGKILL'); fail(error); });
                child.on('close', code => {
                    if (code !== 0) { fail(new Error(executable + ' failed: ' + stderr)); return; }
                    output.end(() => {
                        if (!settled) { settled = true; clearTimeout(timer); resolve(); }
                    });
                });
            });
            return '';
        }
        const result = await run(executable, args, { timeout: 60000, maxBuffer: 16 * 1024 * 1024 });
        return result.stdout;
    }

    private async packetCount(file: string): Promise<number> {
        const stdout = await this.command('capinfos', ['-c', '-M', file]);
        const match = stdout.match(/Number of packets:\s*(\d+)/i);
        if (!match) {
            throw new Error('capinfos did not report packet count');
        }
        return Number.parseInt(match[1], 10);
    }

    private async sendChunkToElastic(jsonPath: string, expectedCount: number): Promise<number> {
        const host = process.env.ELASTIC_HOST;
        const username = process.env.ELASTIC_USERNAME;
        const password = process.env.ELASTIC_PASSWORD;
        if (!host || !username || !password) {
            throw new Error('Elasticsearch connection settings are missing');
        }
        let body: string;
        try {
            body = await this.command('curl', [
                '--fail', '--silent', '--show-error', '--max-time', '60',
                '--user', username + ':' + password,
                '--header', 'Content-Type: application/x-ndjson',
                '--request', 'POST', '--data-binary', '@' + jsonPath,
                'http://' + host + '/_bulk?refresh=wait_for',
            ]);
        } catch (_) {
            // execFile errors may embed argv (including ELASTIC_PASSWORD) and stderr.
            throw new Error('Elasticsearch bulk transport failed');
        }
        let result: any;
        try { result = JSON.parse(body); } catch (_) { throw new Error('Invalid Elasticsearch bulk response'); }
        const items = result.items;
        if (result.errors !== false || !Array.isArray(items) || items.length !== expectedCount ||
            items.some(item => !item.index || item.index.error ||
                item.index.status < 200 || item.index.status >= 300)) {
            const rejected = Array.isArray(items) ? items.find(item => !item.index ||
                item.index.error || item.index.status < 200 || item.index.status >= 300) : null;
            const index = rejected && rejected.index;
            const detail = index && index.error;
            // Only structured diagnostics: never include reason, document, or raw response.
            const status = index && Number.isInteger(index.status) &&
                index.status >= 100 && index.status <= 599 ? index.status : null;
            const type = detail && typeof detail.type === 'string' &&
                /^[a-z][a-z0-9_]{0,79}$/.test(detail.type) ? detail.type : 'unknown';
            throw new Error('Elasticsearch bulk did not index all packets' +
                (status === null ? '' : ' (HTTP ' + status + ')') + ': ' + type);
        }
        return items.length;
    }
}
