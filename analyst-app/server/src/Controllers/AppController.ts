import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from '../Domain/Guards/LoginGuard';

@Controller('api/app/')
export class AppController {
    @UseGuards(LoginGuard)
    @Post('auth/login')
    login(@Res() res: Response) {
        return true;
    }
}
