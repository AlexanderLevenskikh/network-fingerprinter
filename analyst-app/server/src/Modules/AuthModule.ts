import { Module } from '@nestjs/common';
import { UserModule } from './UserModule';
import { AuthService } from '../Services/Auth/AuthService';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../Services/Auth/LocalStrategy';
import { SessionSerializer } from '../Services/Auth/SessionSerializer';
import { AuthController } from '../Controllers/AuthController';

@Module({
    imports: [
        UserModule,
        PassportModule,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        SessionSerializer,
    ],
    controllers: [
        AuthController,
    ],
})
export class AuthModule {
}
