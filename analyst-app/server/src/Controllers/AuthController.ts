import { Controller, Get, Post, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
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
}
