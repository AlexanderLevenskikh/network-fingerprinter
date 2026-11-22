import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { UserModel } from './UserModel';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../Entities/User';
import { Repository } from 'typeorm';
import { IUserRegistrationEvent } from './IUserRegistrationEvent';
import { isEmpty } from '../../Shared/Utils/isEmpty';
import { mapUserEntityToModel } from '../../Mappers/User/mapUserEntityToModel';
import uuid = require('uuid');
import { hashPassword, isHistoricalDefaultCredential, needsPasswordRehash, verifyPassword } from '../Auth/PasswordHash';

@Injectable()
export class UserService implements OnModuleInit {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async onModuleInit(): Promise<void> {
        // Fresh Compose database: seed through Node's modern KDF rather than SQL MD5.
        // Never insert the historical root/root account or overwrite existing rows.
        if (await this.userRepository.count()) { return; }
        const username = process.env.APP_ADMIN_USERNAME;
        const password = process.env.APP_ADMIN_PASSWORD;
        if (!username || username.length > 100 || !password || password.length < 12 ||
            username === 'root' && password === 'root') {
            throw new Error('Configured initial administrator credentials are required');
        }
        await this.userRepository.insert({
            userid: '00000000-0000-0000-0000-000000000000',
            username,
            passwordhash: await hashPassword(password),
            isadmin: true,
            firstname: 'Administrator',
        });
    }

    public async findOne(username: string): Promise<UserModel | undefined> {
        const user = await this.userRepository.findOne({ username });

        if (!user) {
            return undefined;
        }

        return mapUserEntityToModel(user);
    }

    public async validateCredentials(username: string, password: string): Promise<UserModel | null> {
        if (typeof username !== 'string' || typeof password !== 'string') {
            return null;
        }
        const user = await this.userRepository.findOne({ username });
        if (!user || isHistoricalDefaultCredential(user.username, user.passwordhash) ||
            !(await verifyPassword(password, user.passwordhash))) {
            return null;
        }
        if (needsPasswordRehash(user.passwordhash)) {
            // Conditional write avoids replacing a password concurrently changed by an admin.
            await this.userRepository.update(
                { userid: user.userid, passwordhash: user.passwordhash },
                { passwordhash: await hashPassword(password) },
            );
        }
        return mapUserEntityToModel(user);
    }

    public async findById(userId: string): Promise<UserModel | undefined> {
        if (typeof userId !== 'string' || !/^[a-f0-9-]{36}$/i.test(userId)) {
            return undefined;
        }
        const user = await this.userRepository.findOne({ userid: userId });
        return user ? mapUserEntityToModel(user) : undefined;
    }

    public async findAll(): Promise<UserModel[]> {
        const users = await this.userRepository.find();

        return users.map(mapUserEntityToModel)
    }

    public async remove(userId): Promise<any> {
        return await this.userRepository.delete(userId);
    }

    public async register(event: IUserRegistrationEvent): Promise<any> {
        if (isEmpty(event.userName) || isEmpty(event.password)) {
            throw new BadRequestException();
        }

        return await this.userRepository.insert({
            userid: uuid.v1(),
            username: event.userName,
            passwordhash: await hashPassword(event.password),
            isadmin: event.isAdmin,
            firstname: event.firstName,
            lastname: event.lastName,
            middlename: event.middleName,
        });
    }
}
