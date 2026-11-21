import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { execFile } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as uuid from 'uuid';

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
        const filtered = path.join(dir, 'filtered.pcap');
        let indexedPackets = 0;
        try {
            await fs.promises.writeFile(original, fileBuffer);
            // capinfos validates even when the filter would select zero packets.
            try {
                await this.packetCount(original);
                await this.command('tshark', ['-Y', FILTER, '-r', original, '-w', filtered, '-n']);
            } catch (_) {
                throw new BadRequestException('Invalid or damaged PCAP file');
            }
            const matchedPackets = await this.packetCount(filtered);
            if (matchedPackets === 0) {
                return { status: 'no_matches', indexedPackets: 0 };
            }

            // Sequential chunks: at most one editcap, tshark or curl process at a time.
            // In particular, a capture with many packets cannot fan out thousands of jobs.
            for (let start = 1; start <= matchedPackets; start += 100) {
                const end = Math.min(matchedPackets, start + 99);
                const chunk = path.join(dir, 'chunk.pcap');
                const json = path.join(dir, 'chunk.json');
                await this.command('editcap', ['-r', filtered, chunk, String(start) + '-' + String(end)]);
                await this.command('tshark', ['-T', 'ek', '-r', chunk, '-n'], json);
                const count = await this.transformChunk(json, dir);
                if (count !== end - start + 1) {
                    throw new Error('Packet conversion count mismatch');
                }
                indexedPackets += await this.sendChunkToElastic(json, count);
                await fs.promises.unlink(chunk);
                await fs.promises.unlink(json);
            }
            if (indexedPackets !== matchedPackets) {
                throw new Error('Indexed packet count mismatch');
            }
            return { status: 'indexed', indexedPackets };
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
            await fs.promises.rmdir(dir, { recursive: true });
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

    private async transformChunk(jsonPath: string, dir: string): Promise<number> {
        const fileText = await fs.promises.readFile(jsonPath, 'utf8');
        const rows = fileText.split('\n').filter(line => line.trim()).map(line => JSON.parse(line));
        const importId = path.basename(dir);
        let count = 0;
        for (const row of rows) {
            if (row.index) {
                delete row.index._type;
            } else {
                if (!row.layers) { throw new Error('Missing tshark packet layers'); }
                const stream = row.layers.tcp ? row.layers.tcp.tcp_tcp_stream
                    : row.layers.udp ? row.layers.udp.udp_udp_stream : uuid.v1();
                row.streamId = importId + '-' + stream;
                row.sensorId = 'pcap-player-' + process.env.APP_ID;
                count++;
            }
        }
        if (rows.length !== count * 2) {
            throw new Error('Invalid tshark bulk action/document pair');
        }
        await fs.promises.writeFile(jsonPath, rows.map(row => JSON.stringify(row)).join('\n') + '\n');
        return count;
    }

    private async sendChunkToElastic(jsonPath: string, expectedCount: number): Promise<number> {
        const host = process.env.ELASTIC_HOST;
        const username = process.env.ELASTIC_USERNAME;
        const password = process.env.ELASTIC_PASSWORD;
        if (!host || !username || !password) {
            throw new Error('Elasticsearch connection settings are missing');
        }
        const body = await this.command('curl', [
            '--fail', '--silent', '--show-error', '--max-time', '60',
            '--user', username + ':' + password,
            '--header', 'Content-Type: application/x-ndjson',
            '--request', 'POST', '--data-binary', '@' + jsonPath,
            'http://' + host + '/_bulk?refresh=wait_for',
        ]);
        let result: any;
        try { result = JSON.parse(body); } catch (_) { throw new Error('Invalid Elasticsearch bulk response'); }
        const items = result.items;
        if (result.errors !== false || !Array.isArray(items) || items.length !== expectedCount ||
            items.some(item => !item.index || item.index.error ||
                item.index.status < 200 || item.index.status >= 300)) {
            throw new Error('Elasticsearch bulk did not index all packets');
        }
        return items.length;
    }
}
