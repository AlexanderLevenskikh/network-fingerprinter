import { Module } from '@nestjs/common';
import { UserService } from '../Services/User/UserService';

@Module({
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}
