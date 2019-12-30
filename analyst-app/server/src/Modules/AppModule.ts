import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FlowModule } from './FlowModule';
import { PacketModule } from './PacketModule';
import { TcpStreamModule } from './TcpStreamModule';
import { HttpStreamModule } from './HttpStreamModule';
import { TlsPacketModule } from './TlsPacketModule';
import { UserModule } from './UserModule';
import { AuthModule } from './AuthModule';
import { AppController } from '../Controllers/AppController';
import { ReactMiddleware } from '../Middleware/ReactMiddleware';

@Module({
    imports: [
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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ReactMiddleware).forRoutes(
            {
                path: '/**',
                method: RequestMethod.ALL,
            },
        );
    }
}
