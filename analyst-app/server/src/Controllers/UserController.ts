import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { AuthExceptionFilter } from '../Filters/AuthExceptionsFilter';
import { AuthenticatedGuard } from '../Services/Guards/AuthenticatedGuard';
import { UserService } from '../Services/User/UserService';
import { CurrentUser } from '../Services/User/CurrentUser';
import { mapUserEntityToView } from '../Mappers/User/mapUserEntity';

@UseFilters(AuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
@Controller('api/user')
export class UserController {
    @Get('current')
    async getCurrentUser(@CurrentUser() user) {
        return mapUserEntityToView(user);
    }
}
