import { Injectable } from '@nestjs/common';
import { UserService } from '../User/UserService';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
