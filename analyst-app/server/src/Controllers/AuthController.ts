import { Controller, Get, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoginGuard } from '../Services/Guards/LoginGuard';
import { AuthExceptionFilter } from '../Filters/AuthExceptionsFilter';

@UseFilters(AuthExceptionFilter)
@Controller('api/auth/')
export class AuthController {
    @UseGuards(LoginGuard)
    @Post('/login')
    login(@Res() res: Response) {
        res.redirect('/');
    }

    @Get('/logout')
    logout(@Req() req: Request, @Res() res: Response) {
        req.logout();
        res.redirect('/');
    }
}
