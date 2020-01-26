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
import { TcpStatisticsModule } from './TcpStatisticsModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entities/User';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [ UserEntity ],
            synchronize: true,
        }),
        TcpStreamModule,
        TcpStatisticsModule,
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
