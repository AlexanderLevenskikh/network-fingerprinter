import { Module } from '@nestjs/common';
import { UserService } from '../Domain/User/UserService';

@Module({
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}
