import { Controller, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthExceptionFilter } from '../Filters/AuthExceptionsFilter';
import { AuthenticatedGuard } from '../Services/Guards/AuthenticatedGuard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseFilters(AuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
@Controller('api/player')
export class PlayerController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadDump(@UploadedFile() file) {
        console.log(file);
    }
}
