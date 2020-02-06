import { Body, Controller, Delete, Get, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { AuthExceptionFilter } from '../Filters/AuthExceptionsFilter';
import { AuthenticatedGuard } from '../Services/Guards/AuthenticatedGuard';
import { UserService } from '../Services/User/UserService';
import { CurrentUser } from '../Services/User/CurrentUser';
import { mapUserEntityToView } from '../Mappers/User/mapUserEntityToView';
import { IUserRegistrationEvent } from '../Services/User/IUserRegistrationEvent';
import { mapUserModelToView } from '../Mappers/User/mapUserModelToView';

@UseFilters(AuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('current')
    async getCurrentUser(@CurrentUser() user) {
        return mapUserEntityToView(user);
    }

    @Get('list')
    async getUsersList(@CurrentUser() user) {
        const allUsers = await this.userService.findAll();

        return allUsers.map(mapUserModelToView);
    }

    @Delete('remove')
    async removeUser(@Query() query) {
        return this.userService.remove(query.userId);
    }

    @Post('register')
    async register(@Body() event: IUserRegistrationEvent) {
        return this.userService.register(event);
    }
}
