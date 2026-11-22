import { Injectable } from '@nestjs/common';
import { UserService } from '../User/UserService';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.validateCredentials(username, pass);
        if (!user) {
            return null;
        }
        const { passwordHash, ...result } = user;
        return result;
    }
}
