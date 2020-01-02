import { Injectable } from '@nestjs/common';
import { UserModel } from './UserModel';

@Injectable()
export class UserService {
    private readonly users: UserModel[];

    constructor() {
        this.users = [
            {
                userId: '1',
                name: 'nina',
                password: '12345',
            },
            {
                userId: '2',
                name: 'zina',
                password: '54321',
            },
        ]
    }

    async findOne(name: string): Promise<UserModel | undefined> {
        return this.users.find(user => user.name === name);
    }
}
