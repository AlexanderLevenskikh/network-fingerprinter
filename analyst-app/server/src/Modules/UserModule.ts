import { Module } from '@nestjs/common';
import { UserService } from '../Services/User/UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entities/User';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}
