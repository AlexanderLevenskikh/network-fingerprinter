import { Module } from '@nestjs/common';
import { UserModule } from './UserModule';
import { AuthService } from '../Domain/Auth/AuthService';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../Domain/Auth/LocalStrategy';
import { SessionSerializer } from '../Domain/Auth/SessionSerializer';

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
})
export class AuthModule {
}
