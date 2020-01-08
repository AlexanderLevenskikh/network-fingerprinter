import { Module } from '@nestjs/common';
import { UserService } from '../Services/User/UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entities/User';
import { UserController } from '../Controllers/UserController';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {
}
