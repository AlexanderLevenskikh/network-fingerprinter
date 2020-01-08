import { Injectable } from '@nestjs/common';
import { UserService } from '../User/UserService';
import md5 = require('md5');

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && user.passwordHash === md5(pass)) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }
}
