import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModel } from './UserModel';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../Entities/User';
import { Repository } from 'typeorm';
import { IUserRegistrationEvent } from './IUserRegistrationEvent';
import { isEmpty } from '../../Shared/Utils/isEmpty';
import { mapUserEntityToModel } from '../../Mappers/User/mapUserEntityToModel';
import uuid = require('uuid');
import md5 = require('md5');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
        this.userRepository.find().then(users => {
            if (users.length === 0) {
                this.userRepository.insert({
                    userid: uuid.v1(),
                    username: 'root',
                    passwordhash: md5('root'),
                    isadmin: true,
                    firstname: 'Admin',
                });
            }
        })
    }

    public async findOne(username: string): Promise<UserModel | undefined> {
        const user = await this.userRepository.findOne({ username });

        if (!user) {
            return undefined;
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
            passwordhash: md5(event.password),
            isadmin: event.isAdmin,
            firstname: event.firstName,
            lastname: event.lastName,
            middlename: event.middleName,
        });
    }
}
