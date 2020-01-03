import { Module } from '@nestjs/common';
import { FingerprintViewTcpProvider } from '../DAL/Fingerprint/Tcp/FingerprintViewTcpProvider';

@Module({
    providers: [
        FingerprintViewTcpProvider,
    ],
    exports: [
        FingerprintViewTcpProvider,
    ],
})
export class FingerprintModule {
}
