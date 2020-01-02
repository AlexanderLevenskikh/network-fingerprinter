import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TcpStreamModule } from './TcpStreamModule';
import { PacketHttpModule } from './PacketHttpModule';
import { PacketTlsModule } from './PacketTlsModule';
import { UserModule } from './UserModule';
import { AuthModule } from './AuthModule';
import { AppController } from '../Controllers/AppController';
import { ReactMiddleware } from '../Middleware/ReactMiddleware';
import { PlayerModule } from './PlayerModule';
import { PacketTcpModule } from './PacketTcpModule';

@Module({
    imports: [
        TcpStreamModule,
        PacketHttpModule,
        PacketTlsModule,
        PacketTcpModule,
        UserModule,
        AuthModule,
        PlayerModule,
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
