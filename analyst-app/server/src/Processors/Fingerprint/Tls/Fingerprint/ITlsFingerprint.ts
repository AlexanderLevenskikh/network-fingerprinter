import { Nullable } from '../../../../Shared/Types/Nullable';

export interface ITlsFingerprint {
    userAgent: string[];
    sslBlackListReason: Nullable<string>;
}
