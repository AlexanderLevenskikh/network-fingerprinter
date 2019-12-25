export class FilePolyfill extends Blob {
    name: string;
    lastModified: number;

    constructor(chunks: any[], filename: string, opts = { }) {
        super(chunks, opts);

        this.name = filename;
        this.lastModified = new Date().valueOf();
    }
}
