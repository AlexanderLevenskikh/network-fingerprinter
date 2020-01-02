export interface IPlayerApi {
    uploadDump(files: File[]): Promise<void>;
}
