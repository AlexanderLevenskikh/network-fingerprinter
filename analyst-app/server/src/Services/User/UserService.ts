import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModel } from './UserModel';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../Entities/User';
import { Repository } from 'typeorm';
import { IUserRegistrationEvent } from './IUserRegistrationEvent';
import { isEmpty } from '../../Shared/Utils/isEmpty';
import { mapUserEntityToModel } from '../../Mappers/User/mapUserEntityToModel';
import uuid = require('uuid');
import { hashPassword, isLegacyPasswordHash, verifyPassword } from '../Auth/PasswordHash';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

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
        if (!user || !verifyPassword(password, user.passwordhash)) {
            return null;
        }
        if (isLegacyPasswordHash(user.passwordhash)) {
            // Conditional write avoids replacing a password concurrently changed by an admin.
            await this.userRepository.update(
                { userid: user.userid, passwordhash: user.passwordhash },
                { passwordhash: hashPassword(password) },
            );
        }
        return mapUserEntityToModel(user);
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
            passwordhash: hashPassword(event.password),
            isadmin: event.isAdmin,
            firstname: event.firstName,
            lastname: event.lastName,
            middlename: event.middleName,
        });
    }
}
