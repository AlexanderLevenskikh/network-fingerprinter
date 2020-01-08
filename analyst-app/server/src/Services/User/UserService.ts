import { Injectable } from '@nestjs/common';
import { UserModel } from './UserModel';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../Entities/User';
import { Repository } from 'typeorm';
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
}
