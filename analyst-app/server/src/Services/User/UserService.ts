import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserModel } from './UserModel';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../Entities/User';
import { Repository } from 'typeorm';
import uuid = require('uuid');
import md5 = require('md5');
import { CurrentUser } from './CurrentUser';
import { IUserRegistrationEvent } from './IUserRegistrationEvent';
import { isEmpty } from '../../Shared/Utils/isEmpty';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
        this.userRepository.find().then(users => {
            if (users.length === 0) {
                this.userRepository.insert({
                    userId: uuid.v1(),
                    userName: 'root',
                    passwordHash: md5('root'),
                    isAdmin: true,
                    firstName: 'Admin',
                });
            }
        })
    }

    public async findOne(userName: string): Promise<UserModel | undefined> {
        return await this.userRepository.findOne({ userName });
    }

    public async findAll(): Promise<UserModel[]> {
        return await this.userRepository.find();
    }

    public async remove(userId): Promise<any> {
        return await this.userRepository.delete(userId);
    }

    public async register(event: IUserRegistrationEvent): Promise<any> {
        if (isEmpty(event.userName) || isEmpty(event.password)) {
            throw new BadRequestException();
        }

        return await this.userRepository.insert({
            userId: uuid.v1(),
            userName: event.userName,
            passwordHash: md5(event.password),
            isAdmin: event.isAdmin,
            firstName: event.firstName,
            lastName: event.lastName,
            middleName: event.middleName,
        });
    }
}
