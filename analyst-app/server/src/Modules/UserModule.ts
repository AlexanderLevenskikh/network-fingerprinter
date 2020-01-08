import { Module } from '@nestjs/common';
import { UserService } from '../Services/User/UserService';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 3306,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [],
            synchronize: true,
        }),
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}
