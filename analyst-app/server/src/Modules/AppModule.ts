import { Module } from '@nestjs/common';
import { FlowModule } from './FlowModule';
import { PacketModule } from './PacketModule';
import { TcpStreamModule } from './TcpStreamModule';
import { HttpStreamModule } from './HttpStreamModule';
import { TlsPacketModule } from './TlsPacketModule';
import { UserModule } from './UserModule';
import { AuthModule } from './AuthModule';
import { AppController } from '../Controllers/AppController';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            renderPath:
            rootPath: join(__dirname, '..', '..', 'static'),
        }),
        FlowModule,
        PacketModule,
        TcpStreamModule,
        HttpStreamModule,
        TlsPacketModule,
        UserModule,
        AuthModule,
    ],
    controllers: [
        AppController,
    ],
})
export class AppModule {
}
