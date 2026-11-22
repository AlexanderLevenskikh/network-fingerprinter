import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../User/UserService';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly users: UserService) {
        super();
    }

    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        // Persist only the stable identifier; never roles or password hashes in cookies/session.
        done(null, user && user.userId);
    }

    deserializeUser(payload: any, done: (err: Error, user: any) => void): any {
        // Old Passport sessions stored full user objects; ignore their stale roles/hash.
        const userId = typeof payload === 'string' ? payload : payload && payload.userId;
        this.users.findById(userId)
            .then(user => {
                if (!user) { done(null, false); return; }
                const { passwordHash, ...safeUser } = user;
                done(null, safeUser);
            })
            .catch(error => done(error, null));
    }
}
