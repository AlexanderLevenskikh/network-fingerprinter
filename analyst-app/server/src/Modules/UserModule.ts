import { Module } from '@nestjs/common';
import { UserService } from '../Services/User/UserService';
import { UserController } from '../Controllers/UserController';

@Module({
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}