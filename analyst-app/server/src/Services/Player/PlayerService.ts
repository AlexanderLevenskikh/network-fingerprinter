import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { mkdir, rm, touch } from 'shelljs';
import { resolve } from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { writeFile } from 'fs';
import { exec } from 'child_process';
import * as ndjson from 'ndjson';

@Injectable()
export class PlayerService {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
    }

    public uploadDump(fileBuffer: any): Promise<any> {
        return new Promise((res, rej) => {
            mkdir(resolve(process.cwd(), 'temp'));

            const guid = uuid.v1();

            const pcapFilePath = resolve(process.cwd(), `temp/${ guid }.pcap`);
            touch(pcapFilePath);

            writeFile(pcapFilePath, fileBuffer, (err) => {
                if (err) {
                    rej(err);
                }

                this.splitPcapIntoChunks(guid).then(async (chunkPromises) => {
                    let chunkNames = [];

                    try {
                        chunkNames = await Promise.all(chunkPromises);
                        for (const chunkName of chunkNames) {
                            await this.transformChunk(guid, chunkName);
                            await this.sendChunkToElastic(guid, chunkName);
                        }

                        res();
                    } catch (error) {
                        for (const chunkName of chunkNames) {
                            rm(`./temp/${ guid }-${ chunkName }.json`);
                        }
                        // TODO cleanup
                        rej(error);
                    } finally {
                        rm(`./temp/${ guid }.json`);
                    }
                }).catch(err => rej(err));
            })

            /*writeFile(pcapFilePath, fileBuffer, (err) => {
                if (err) {
                    promiseReject(err);
                }

                const cb = (error, stdout, stderr) => {
                    if (error) {
                        promiseReject(error);
                    }

                    let transformedNdJson = '';
                    fs.createReadStream(resolve(process.cwd(), `temp/${ guid }.json`))
                        .pipe(ndjson.parse())
                        .on('data', (obj) => {
                            if (obj.index && obj.index._type) {
                                delete obj.index._type;
                            }

                            transformedNdJson += `${ JSON.stringify(obj) }\n`;
                        })
                        .on('end', () => {
                            fs.writeFile(resolve(process.cwd(), `temp/${ guid }.json`), transformedNdJson, (err) => {
                                rm(`./temp/${ guid }.pcap`);

                                if (err) {
                                    promiseReject(err);
                                }

                                const host = `${ process.env.ELASTIC_USERNAME }:${ process.env.ELASTIC_PASSWORD }@${ process.env.ELASTIC_HOST }`;
                                const cleanupCb = (error, stdout, stderr) => {
                                    if (error) {
                                        promiseReject(error);
                                    }

                                    rm(`./temp/${ guid }.json`);

                                    promiseResolve();
                                };

                                if (!/^win/.test(process.platform)) {
                                    exec(
                                        `curl ${ host }/_bulk -H 'Content-Type: application/x-ndjson' -X POST --data-binary @./temp/${ guid }.json`,
                                        cleanupCb,
                                    );
                                } else {
                                    exec(
                                        `cmd /s /c curl ${ host }/_bulk -H "Content-Type: application/x-ndjson" -X POST --data-binary @./temp/${ guid }.json`,
                                        cleanupCb,
                                    );
                                }

                            });
                        });
                };

                if (!/^win/.test(process.platform)) {
                    exec(`tshark -T ek -r ./temp/${ guid }.pcap > ./temp/${ guid }.json`, cb);
                } else {
                    exec(`cmd /s /c tshark -T ek -r ./temp/${ guid }.pcap > ./temp/${ guid }.json`, cb);
                }
            });*/
        });
    }

    private sendChunkToElastic = async (
        guid: string,
        range: string,
    ) => {
        return new Promise((res, rej) => {
            const host = `${ process.env.ELASTIC_USERNAME }:${ process.env.ELASTIC_PASSWORD }@${ process.env.ELASTIC_HOST }`;
            const cleanupCb = (error, stdout, stderr) => {
                if (error) {
                    rej(error);
                }

                rm(`./temp/${ guid }-${ range }.json`);
                res();
            };

            if (!/^win/.test(process.platform)) {
                exec(
                    `curl ${ host }/_bulk -H 'Content-Type: application/x-ndjson' -X POST --data-binary @./temp/${ guid }-${ range }.json`,
                    cleanupCb,
                );
            } else {
                exec(
                    `cmd /s /c curl ${ host }/_bulk -H "Content-Type: application/x-ndjson" -X POST --data-binary @./temp/${ guid }-${ range }.json`,
                    cleanupCb,
                );
            }
        });
    };

    private transformChunk = async (
        guid: string,
        range: string,
    ) => {
        return new Promise((res, rej) => {
            const processChunkCb = (error, stdout, stderr) => {
                if (error) {
                    rej(error);
                }

                let transformedNdJson = '';
                fs.createReadStream(resolve(process.cwd(), `temp/${ guid }-${ range }.json`))
                    .pipe(ndjson.parse())
                    .on('data', (obj) => {
                        if (obj.index && obj.index._type) {
                            delete obj.index._type;
                        }

                        transformedNdJson += `${ JSON.stringify(obj) }\n`;
                    })
                    .on('error', (err) => {
                        rej(err);
                    })
                    .on('end', () => {
                        fs.writeFile(resolve(process.cwd(), `temp/${ guid }-${ range }.json`), transformedNdJson, (err) => {
                            if (err) {
                                rej(err);
                            }

                            res();
                        })
                    });

                rm(`./temp/${ guid }-${ range }.pcap`);
            };

            const command = `tshark -T ek -r ./temp/${ guid }-${ range }.pcap > ./temp/${ guid }-${ range }.json`;
            if (!/^win/.test(process.platform)) {
                exec(command, processChunkCb);
            } else {
                exec(`cmd /s /c ${command}`, processChunkCb);
            }
        });
    };

    private splitPcapIntoChunks = async (
        guid: string,
        step: number = 100,
    ): Promise<Array<Promise<string>>> => {
        const chunkNamePromises = [];

        const packetsCount = await this.getPacketsCountInPcap(guid);
        let leftBorder = 0;

        while (leftBorder < packetsCount) {
            const chunkNamePromise = new Promise<string>((res, rej) => {
                const rightBorder = leftBorder + step;
                const range = rightBorder <= packetsCount ? `${leftBorder}-${rightBorder}` : leftBorder.toString();

                const chunkCb = (error, stdout, stderr) => {
                    if (error) {
                        rej(error);
                    }

                    res(range);
                };

                const command = `editcap -r ./temp/${ guid }.pcap ./temp/${ guid }-${range}.pcap ${range}`;
                if (!/^win/.test(process.platform)) {
                    exec(command, chunkCb);
                } else {
                    exec(`cmd /s /c ${command}`, chunkCb);
                }

                leftBorder = rightBorder;
            });

            chunkNamePromises.push(chunkNamePromise);
        }

        return chunkNamePromises;
    };

    private getPacketsCountInPcap = (
        guid: string,
    ): Promise<number> => {
        return new Promise<number>((res, rej) => {
            const capInfosCb = (error, stdout, stderr) => {
                if (error) {
                    rej(error);
                }

                const numberOfPackets = stdout.match(/Number of packets:\s*(\d+)/i);

                if (numberOfPackets && numberOfPackets[1]) {
                    res(Number.parseInt(numberOfPackets[1], 10));
                } else {
                    rej('capinfos error');
                }
            };

            const command = `capinfos ./temp/${ guid }.pcap -c -M`;
            if (!/^win/.test(process.platform)) {
                exec(command, capInfosCb);
            } else {
                exec(`cmd /s /c ${command}`, capInfosCb);
            }
        })
    };
}
