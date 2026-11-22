import { Body, Controller, Delete, ForbiddenException, Get, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
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
        return mapUserModelToView(user);
    }

    @Get('list')
    async getUsersList(@CurrentUser() user) {
        this.requireAdmin(user);
        const allUsers = await this.userService.findAll();

        return allUsers.map(mapUserModelToView);
    }

    @Delete('remove')
    async removeUser(@CurrentUser() user, @Query() query) {
        this.requireAdmin(user);
        return this.userService.remove(query.userId);
    }

    @Post('register')
    async register(@CurrentUser() user, @Body() event: IUserRegistrationEvent) {
        this.requireAdmin(user);
        return this.userService.register(event);
    }

    private requireAdmin(user: any): void {
        if (!user || user.isAdmin !== true) {
            throw new ForbiddenException('Administrator privileges required');
        }
    }
}
