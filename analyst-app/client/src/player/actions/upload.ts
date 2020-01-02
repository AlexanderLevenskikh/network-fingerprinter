import { createAction as csa } from 'typesafe-actions';
import { IErrorPayload } from 'root/shared/types/actions/errorPayload';
import { ITcpStreamView } from 'DAL/Stream/Tcp/ITcpStreamView';

interface IPlayerUploadPayload {
    files: File[];
}

export enum PlayerUploadActionTypes {
    Upload = 'player/upload',
    UploadSucceed = 'player/upload/succeed',
    UploadFailed = 'player/upload/failed',
}

export const PlayerUploadActions = {
    Upload: csa(PlayerUploadActionTypes.Upload)<IPlayerUploadPayload>(),
    UploadSucceed: csa(PlayerUploadActionTypes.UploadSucceed)(),
    UploadFailed: csa(PlayerUploadActionTypes.UploadFailed)<IErrorPayload>(),
};
