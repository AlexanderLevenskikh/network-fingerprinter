import { IPlayerApi } from 'root/api/interface/player';
import { httpClient, HttpClientMethod, HttpClientResponseType } from 'root/api/httpClient';

export class PlayerApi implements IPlayerApi {
    uploadDump(files: File[]): Promise<void> {
        return httpClient({
            controller: 'api/player',
            action: 'upload',
            method: HttpClientMethod.GET,
            request: {
                body: {
                    files,
                },
                toFormData: true,
            },
            responseType: HttpClientResponseType.JSON,
        });
    }
}
